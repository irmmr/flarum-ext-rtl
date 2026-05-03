<?php

namespace Irmmr\FlarumRtlSupport\Frontend\Content;

use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ServerRequestInterface;
use Flarum\Frontend\Document;
use Flarum\Foundation\Application;
use Irmmr\FlarumRtlSupport\Interfaces\HasSettings;
use Irmmr\FlarumRtlSupport\Traits\SettingsTrait;

abstract class BaseContent implements HasSettings
{
    use SettingsTrait;

    /**
     * Additional styles for content.
     *
     * @var array
     */
    protected array $extraStyles = [];

    /**
     * All rtl payloads.
     *
     * @var array
     */
    protected array $rtlPayloads = [
        // fof-nightmode
        'fof-nightmode.assets.day',
        'fof-nightmode.assets.night'
    ];

    /**
     * Define rtl languages.
     *
     * @var array $rtlLanguages
     */
    protected array $rtlLanguages = ['fa', 'ar', 'he'];

    /**
     * Stylesheet pattern in regexp.
     *
     * @var string
     */
    protected string $stylesheetPattern = '/href=["\']?([^"\'>]+)["\']?/';

    /**
     * class constructor.
     *
     * @param SettingsRepositoryInterface $settings
     * @param Application $app
     */
    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected Application $app
    ) {}

    /**
     * Magic method invoke for apply changes
     * plus making everything rtl.
     *
     * @param  Document                 $document
     * @param  ServerRequestInterface   $request
     * @return void
     */
    abstract public function __invoke(Document $document, ServerRequestInterface $request): void;

    /**
     * Check RTL support based on language.
     *
     * @param   string $language
     * @return  bool
     */
    protected function isLangSupportRtl(string $language): bool
    {
        return in_array($language, $this->rtlLanguages, true);
    }

    /**
     * Check whole rtl status.
     *
     * @param  Document  $document
     * @param  string    $view
     * @return bool
     */
    protected function mustBeRtl(Document $document, string $view): bool
    {
        $statusSetting = $view === 'forum' ? 'irmmr-rtl.fm_status' : 'irmmr-rtl.ad_status';
        $active = $this->getSettingOption($statusSetting, true);

        if ($active && $this->getSettingOption('irmmr-rtl.lang_base', true)) {
            $active = $this->isLangSupportRtl($document->language ?? 'en');
        }

        return $active;
    }

    /**
     * Get forum url.
     *
     * @return string
     */
    protected function getForumUrl(): string
    {
        return $this->app->config('url');
    }

    /**
     * Get rtl version of a file.
     *
     * @param  string $file
     * @return string
     */
    protected function getFileRtl(string $file): string
    {
        $path_info = pathinfo($file);
        $extension = $path_info['extension'] ?? '';

        if (substr($extension, 0, 3) !== 'css') {
            return $file;
        }

        return join('/', [
            $path_info['dirname'],
            $path_info['filename'] . '.rtl.' . $path_info['extension']
        ]);
    }

    /**
     * Determine if file is a local css.
     *
     * @param  string $file
     * @return bool
     */
    protected function isFileLocal(string $file): bool
    {
        return str_starts_with($file, $this->getForumUrl());
    }

    /**
     * Make css rtl.
     *
     * @param  array<string, string> $css_urls
     * @return array
     */
    protected function makeCssRtl(array $cssUrls): array
    {
        foreach ($cssUrls as $key => $file) {
            if (is_string($file) && $this->isFileLocal($file)) {
                $cssUrls[$key] = $this->getFileRtl($file);
            }
        }

        return $cssUrls;
    }

    /**
     * Make head rtl.
     *
     * @param  array $heads
     * @return array
     */
    protected function makeHeadRtl(array $heads): array
    {
        foreach ($heads as $key => $head) {
            preg_match_all($this->stylesheetPattern, $head, $matches, PREG_SET_ORDER);

            foreach ($matches as $match) {
                $url = $match[1] ?? '';

                // it's a local file (css)
                if (filter_var($url, FILTER_SANITIZE_URL) && $this->isFileLocal($url)) {
                    $heads[$key] = str_replace($url, $this->getFileRtl($url), $head);
                }
            }
        }

        return $heads;
    }

    /**
     * Make payload rtl.
     *
     * @todo need some improvement
     * @param  array $payloads
     * @return array
     */
    protected function makePayloadRtl(array $payloads): array
    {
        foreach ($this->rtlPayloads as $key) {
            if (isset($payloads[$key])) {
                $payloads[$key] = $this->getFileRtl($payloads[$key]);
            }
        }

        return $payloads;
    }

    /**
     * Add some extra styles in header.
     *
     * @param   Document  $document
     * @return  void
     */
    protected function addExtraStyles(Document $document): void
    {
        foreach ($this->extraStyles as $style) {
            $document->head[] = "<style>{$style}</style>";
        }
    }
}

