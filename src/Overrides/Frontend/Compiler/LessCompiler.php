<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Frontend\Compiler;

use Flarum\Frontend\Compiler\Source\FileSource;
use Illuminate\Support\Collection;
use Irmmr\RTLCss\Encode;
use MatthiasMullie\Minify;
use Irmmr\RTLCss\Parser as RTLParser;
use Less_Exception_Compiler;
use Less_Parser;
use Sabberworm\CSS\Parser;
use Sabberworm\CSS\Parsing\SourceException;

/**
 * @internal
 */
class LessCompiler extends RevisionCompiler
{
    protected string $cacheDir;
    protected array $importDirs = [];
    protected array $customFunctions = [];
    protected ?Collection $lessImportOverrides = null;
    protected ?Collection $fileSourceOverrides = null;

    public function getCacheDir(): string
    {
        return $this->cacheDir;
    }

    public function setCacheDir(string $cacheDir): void
    {
        $this->cacheDir = $cacheDir;
    }

    public function getImportDirs(): array
    {
        return $this->importDirs;
    }

    public function setImportDirs(array $importDirs): void
    {
        $this->importDirs = $importDirs;
    }

    public function setLessImportOverrides(array $lessImportOverrides): void
    {
        $this->lessImportOverrides = new Collection($lessImportOverrides);
    }

    public function setFileSourceOverrides(array $fileSourceOverrides): void
    {
        $this->fileSourceOverrides = new Collection($fileSourceOverrides);
    }

    public function setCustomFunctions(array $customFunctions): void
    {
        $this->customFunctions = $customFunctions;
    }

    /**
     * @throws \Less_Exception_Parser
     */
    protected function compile(array $sources): string
    {
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
                'compress' => !$this->useRtlCompiler(), // disable compress for save css comments
                'strictMath' => false,
                'cache_dir' => $this->cacheDir,
                'import_dirs' => $this->importDirs,
            ]);

            if ($this->fileSourceOverrides) {
                $sources = $this->overrideSources($sources);
            }

            foreach ($sources as $source) {
                if ($source instanceof FileSource) {
                    // If we have import overrides, parse the file content and apply them
                    if ($this->lessImportOverrides && $this->lessImportOverrides->isNotEmpty()) {
                        $content = file_get_contents($source->getPath());
                        $content = $this->applyImportOverridesToContent($content);
                        // Pass the original file path to maintain proper import resolution context
                        $parser->parse($content, $source->getPath());
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
            } catch (Less_Exception_Compiler $e) {
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

    protected function finalize(string $parsedCss): string
    {
        return str_replace('url("../webfonts/', 'url("./fonts/', $parsedCss);
    }

    /**
     * Determine rtl compiler status.
     *
     * @return bool
     */
    protected function useRtlCompiler(): bool
    {
        return $this->settings->get('irmmr-rtl.driver', 'rtlcss') === 'rtlcss';
    }

    /**
     * Determine css minifier status.
     *
     * @return bool
     */
    protected function useCssMinifier(): bool
    {
        return $this->settings->get('irmmr-rtl.css_minify', true);
    }

    /**
     * #new
     * Minify the css code.
     *
     * @param  string $css
     * @return string
     */
    protected function minifyCssCode(string $css): string
    {
        $minifier = new Minify\CSS;

        $minifier->add($css);
        $minify = $minifier->minify();

        if (empty($minify)) {
            return $css;
        }

        $time = date('Y/m/d H:i:s');
        return "/* minified at {$time} */" . PHP_EOL . $minify;
    }

    /**
     * @param string $file
     * @param SourceInterface[] $sources
     * @return bool true if the file was written, false if there was nothing to write
     */
    protected function save(string $file, array $sources): bool
    {
        if ($content = $this->compile($sources)) {
            $useMinifier = $this->useCssMinifier();

            $this->assetsDir->put($file, $useMinifier ? $this->minifyCssCode($content) : $content);

            // don't use that compiler!
            if (!$this->useRtlCompiler()) {
                return true;
            }

            $pathInfo = pathinfo($file);

            // ignore for rtl files
            if (str_ends_with($pathInfo['filename'], '.rtl')) {
                return true;
            }

            // [file].rtl.[ext]
            $rtlFile = $pathInfo['filename'] . '.rtl.' . $pathInfo['extension'];

            $rtlEncoder = new Encode($content);
            $content = $rtlEncoder->encode();

            try {
                $cssParser = new Parser($content);
                $cssTree = $cssParser->parse();

                $rtlParser = new RTLParser($cssTree);
                $rtlParser->flip();

                $rendered = $cssTree->render();
                $rtlEncoder->setEncoded($rendered);
            } catch (SourceException) {
                return false;
            }

            // save minified rtl file
            $this->assetsDir->put($rtlFile, $useMinifier
                ? $this->minifyCssCode($rtlEncoder->decode())
                : $rtlEncoder->decode());

            return true;
        }

        return false;
    }

    /**
     * Apply import overrides by replacing @import statements with inline content.
     */
    private function applyImportOverridesToContent(string $content): string
    {
        foreach ($this->lessImportOverrides as $override) {
            $file = $override['file'];
            $fileWithoutExt = preg_replace('/\.less$/i', '', $file);
            $quotedFile = preg_quote($fileWithoutExt, '/');

            // Match @import "path" or @import 'path' (with or without .less extension)
            $pattern = '/@import\s+["\']'.$quotedFile.'(\.less)?["\'];?/i';

            if (preg_match($pattern, $content)) {
                // Read the override file content
                $overrideContent = file_get_contents($override['newFilePath']);

                // Replace the @import statement with the actual content
                $content = preg_replace(
                    $pattern,
                    '/* Flarum override: '.$file.' */'."\n".$overrideContent."\n".'/* End override */',
                    $content
                );
            }
        }

        return $content;
    }

    protected function overrideSources(array $sources): array
    {
        foreach ($sources as $source) {
            if ($source instanceof FileSource) {
                $basename = basename($source->getPath());
                $override = $this->fileSourceOverrides
                    ->where('file', $basename)
                    ->firstWhere('extensionId', $source->getExtensionId());

                if ($override) {
                    $source->setPath($override['newFilePath']);
                }
            }
        }

        return $sources;
    }

    protected function getCacheDifferentiator(): ?array
    {
        return [
            'import_dirs' => $this->importDirs
        ];
    }
}