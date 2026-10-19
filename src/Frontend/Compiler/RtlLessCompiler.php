<?php
/*
 * This file is part of Flarum RTL support extension.
 *
 * (c)  Irmmr <irmmr.ir@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Irmmr\FlarumRtlSupport\Frontend\Compiler;

use Flarum\Frontend\Compiler\LessCompiler;
use Flarum\Frontend\Compiler\Source\FileSource;
use Irmmr\RTLCss\Encode;
use Irmmr\RTLCss\Parser as RTLParser;
use Less_Exception_Parser;
use Less_Parser;
use MatthiasMullie\Minify;
use Sabberworm\CSS\Parser;
use Sabberworm\CSS\Parsing\SourceException;

/**
 * Flarum's LESS compiler, plus an RTL copy of every stylesheet.
 *
 * Extends Flarum's compiler instead of replacing it, so everything this class
 * does not override comes from the Flarum that is installed, including methods
 * added after this was written. Flarum builds its compilers through the
 * container (Assets::makeLessCompiler), and extend.php binds this class there.
 *
 * The RTL file is a "sidecar" in Flarum's sense (RevisionCompiler::renderOutput):
 * it is written when, and only when, the main stylesheet is.
 */
class RtlLessCompiler extends LessCompiler
{
    /** The uncompressed CSS of the stylesheet being committed, flipped into the RTL copy. */
    protected ?string $rtlSource = null;

    protected function useRtlCompiler(): bool
    {
        return $this->settings->get('irmmr-rtl.driver', 'rtlcss') === 'rtlcss';
    }

    protected function useCssMinifier(): bool
    {
        return (bool) $this->settings->get('irmmr-rtl.css_minify', true);
    }

    protected function minifyCssCode(string $css): string
    {
        $minifier = new Minify\CSS();
        $minifier->add($css);
        $minified = $minifier->minify();

        return empty($minified) ? $css : $minified;
    }

    protected function renderOutput(array $sources): ?string
    {
        $this->rtlSource = null;

        $css = parent::renderOutput($sources);

        if ($css === null) {
            return null;
        }

        if ($this->useRtlCompiler()) {
            $this->rtlSource = $css;
        }

        return $this->useCssMinifier() ? $this->minifyCssCode($css) : $css;
    }

    protected function writePendingSidecars(): void
    {
        parent::writePendingSidecars();

        $this->writeRtlVersion();
    }

    public function commit(bool $force = false): void
    {
        parent::commit($force);

        // Put back an RTL file that went missing while the main stylesheet did not.
        if ($this->rtlSource !== null && ! $this->assetsDir->exists($this->getRtlFilename($this->filename))) {
            $this->writeRtlVersion();
        }
    }

    protected function getRtlFilename(string $file): string
    {
        $pathInfo = pathinfo($file);

        return $pathInfo['filename'].'.rtl.'.$pathInfo['extension'];
    }

    protected function writeRtlVersion(): bool
    {
        if ($this->rtlSource === null || str_ends_with(pathinfo($this->filename, PATHINFO_FILENAME), '.rtl')) {
            return true;
        }

        $rtlEncoder = new Encode($this->rtlSource);
        $content = $rtlEncoder->encode();

        try {
            $cssTree = (new Parser($content))->parse();

            (new RTLParser($cssTree))->flip();

            $rtlEncoder->setEncoded($cssTree->render());
        } catch (SourceException) {
            return false;
        }

        $rtl = $rtlEncoder->decode();

        $this->assetsDir->put(
            $this->getRtlFilename($this->filename),
            $this->useCssMinifier() ? $this->minifyCssCode($rtl) : $rtl
        );

        return true;
    }

    /**
     * Flarum's compile(), with one change: LESS compression is off while the RTL
     * compiler is on, so the comment directives (`rtl:ignore` and friends) reach
     * the RTL parser. Compression is fixed inside Flarum's compile(), so this is
     * the one method that has to be kept in step with Flarum's, by hand.
     */
    protected function compile(array $sources): string
    {
        if (! $this->useRtlCompiler()) {
            return parent::compile($sources);
        }

        if (! count($sources)) {
            return '';
        }

        if (! empty($this->settings->get('custom_less_error'))) {
            unset($sources['custom_less']);
        }

        $maxNestingLevel = ini_get('xdebug.max_nesting_level');

        ini_set('xdebug.max_nesting_level', '200');

        try {
            $parser = new Less_Parser([
                'compress' => false,
                'strictMath' => false,
                'cache_dir' => $this->cacheDir,
                'import_dirs' => [$this->containImports(...)],
                'cache_method' => 'callback',
                'cache_callback_get' => $this->readCache(...),
                'cache_callback_set' => $this->writeCache(...),
            ]);

            if ($this->fileSourceOverrides) {
                $sources = $this->overrideSources($sources);
            }

            foreach ($sources as $source) {
                if ($source instanceof FileSource) {
                    if ($this->lessImportOverrides && $this->lessImportOverrides->isNotEmpty()) {
                        $parser->parse($this->applyImportOverrides(file_get_contents($source->getPath())), $source->getPath());
                    } else {
                        $parser->parseFile($source->getPath());
                    }
                } else {
                    $parser->parse($source->getContent());
                }
            }

            foreach ($this->customFunctions as $name => $callback) {
                $parser->registerFunction($name, $callback);
            }

            try {
                $compiled = $this->finalize($parser->getCss());

                if (isset($sources['custom_less']) && $this->settings->get('custom_less_error')) {
                    $this->settings->delete('custom_less_error');
                }

                return $compiled;
            } catch (Less_Exception_Parser $e) {
                if (isset($sources['custom_less'])) {
                    unset($sources['custom_less']);

                    $compiled = $this->compile($sources);

                    $this->settings->set('custom_less_error', $e->getMessage());

                    return $compiled;
                }

                throw $e;
            }
        } finally {
            if ($maxNestingLevel !== false) {
                ini_set('xdebug.max_nesting_level', $maxNestingLevel);
            }
        }
    }

    /** Flarum's applyImportOverridesToContent(), which is private there. */
    protected function applyImportOverrides(string $content): string
    {
        foreach ($this->lessImportOverrides as $override) {
            $file = $override['file'];
            $pattern = '/@import\s+["\']'.preg_quote(preg_replace('/\.less$/i', '', $file), '/').'(\.less)?["\'];?/i';

            if (preg_match($pattern, $content)) {
                $content = preg_replace(
                    $pattern,
                    '/* Flarum override: '.$file.' */'."\n".file_get_contents($override['newFilePath'])."\n".'/* End override */',
                    $content
                );
            }
        }

        return $content;
    }
}
