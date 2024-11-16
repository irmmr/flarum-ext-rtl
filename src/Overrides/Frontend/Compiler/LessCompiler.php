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
use Illuminate\Support\Str;
use Irmmr\FlarumRtlSupport\Pack\RTLCss;
use Less_FileManager;
use Less_Parser;
use Less_Tree_Import;
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

        ini_set('xdebug.max_nesting_level', '200');

        $parser = new Less_Parser([
            'compress' => true,
            'cache_dir' => $this->cacheDir,
            'import_dirs' => $this->importDirs,
            'import_callback' => $this->lessImportOverrides ? $this->overrideImports($sources) : null,
        ]);

        if ($this->fileSourceOverrides) {
            $sources = $this->overrideSources($sources);
        }

        foreach ($sources as $source) {
            if ($source instanceof FileSource) {
                $parser->parseFile($source->getPath());
            } else {
                $parser->parse($source->getContent());
            }
        }

        foreach ($this->customFunctions as $name => $callback) {
            $parser->registerFunction($name, $callback);
        }

        return $this->finalize($parser->getCss());
    }

    /**
     * save compiled less file + generated rtl
     * file.less -> file.css + file.rtl.css
     */
    protected function save(string $file, array $sources): bool
    {
        if (empty($sources)) {
            return false;
        }

        // less -> css
        try {
            $css_content = $this->compile($sources);
        } catch (\Less_Exception_Parser $e) {
            return false;
        }

        // add main css file
        if (!$this->assetsDir->put($file, $css_content)) {
            return false;
        }

        // parse main file name
        $path_info = pathinfo($file);

        // check for target file
        // - ignore for rtl files!
        if (substr($path_info['filename'], -strlen('.rtl')) === '.rtl') {
            return true;
        }

        // generate rtl file name
        $rtl_file  = $path_info['filename'] . '.rtl.' . $path_info['extension'];

        // trying to parse created css sources
        $css_parser = new Parser($css_content);

        try {
            $css_tree   = $css_parser->parse();
        } catch (SourceException $e) {
            return false;
        }

        // trying to generate RTL css from main sources
        $rtlcss = new RTLCss($css_tree);

        try {
            $rtlcss->flip();
        } catch (SourceException $e) {
            return false;
        }

        // apply rtl file
        return $this->assetsDir->put($rtl_file, $css_tree->render());
    }

    protected function finalize(string $parsedCss): string
    {
        return str_replace('url("../webfonts/', 'url("./fonts/', $parsedCss);
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

    protected function overrideImports(array $sources): callable
    {
        $baseSources = (new Collection($sources))->filter(function ($source) {
            return $source instanceof Source\FileSource;
        })->map(function (FileSource $source) {
            $path = realpath($source->getPath());
            $path = Str::beforeLast($path, '/less/');

            return [
                'path' => $path,
                'extensionId' => $source->getExtensionId(),
            ];
        })->unique('path');

        return function (Less_Tree_Import $evald) use ($baseSources): ?array {
            $pathAndUri = Less_FileManager::getFilePath($evald->getPath(), $evald->currentFileInfo);

            $relativeImportPath = Str::of($pathAndUri[0])->split('/\/less\//');
            $extensionId = $baseSources->where('path', $relativeImportPath->first())->pluck('extensionId')->first();

            $overrideImport = $this->lessImportOverrides
                ->where('file', $relativeImportPath->last())
                ->firstWhere('extensionId', $extensionId);

            if (! $overrideImport) {
                return null;
            }

            return [$overrideImport['newFilePath'], $pathAndUri[1]];
        };
    }

    protected function getCacheDifferentiator(): ?array
    {
        return [
            'import_dirs' => $this->importDirs
        ];
    }
}