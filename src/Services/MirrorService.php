<?php

namespace Irmmr\FlarumRtlSupport\Services;

use Flarum\Settings\SettingsRepositoryInterface;
use Irmmr\FlarumRtlSupport\Interfaces\HasSettings;
use Irmmr\FlarumRtlSupport\Traits\SettingsTrait;
use Flarum\Frontend\Document;
use Flarum\Foundation\Application;

class MirrorService implements HasSettings
{
    use SettingsTrait;

    /**
     * Define rtl languages.
     *
     * @var array $rtlLanguages
     */
    public array $rtlLanguages = ['fa', 'ar', 'he'];

    /**
     * Url separator. wtf
     *
     * @var string
     */
    protected string $urlSeparator = '/';

    /**
     * Stylesheet pattern in regexp.
     *
     * @var string
     */
    public string $stylesheetPattern = '/href=["\']?([^"\'>]+)["\']?/';

    /**
     * class constructor.
     *
     * @param SettingsRepositoryInterface $settings
     * @param Application $app
     * @param AssetMappingService $assetMappingService
     * @param PayloadsService $payloadsService
     */
    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected Application $app,
        protected AssetMappingService $assetMappingService
    ) {}

    /**
     * Check RTL support based on language.
     *
     * @param   string $language
     * @return  bool
     */
    public function isLangSupportRtl(string $language): bool
    {
        return in_array($language, $this->rtlLanguages, true);
    }

    /**
     * Check document rtl status.
     *
     * @param  Document  $document
     * @param  string    $view
     * @return bool
     */
    public function documentMustBeRtl(Document $document, string $view): bool
    {
        $statusSetting = $view === 'forum' ? 'irmmr-rtl.fm_status' : 'irmmr-rtl.ad_status';
        $active = $this->getSettingOption($statusSetting, true);

        if ($active && $this->getSettingOption('irmmr-rtl.lang_base', true)) {
            $active = $this->isLangSupportRtl($document->language ?? 'en');
        }

        return $active;
    }

    /**
     * Determine if raw string is a valid url.
     *
     * @param  string $raw
     * @return bool
     */
    public function isUrl(string $raw): bool
    {
        return filter_var($raw, FILTER_SANITIZE_URL);
    }

    /**
     * Get forum url.
     *
     * @return string
     */
    public function getForumUrl(): string
    {
        return $this->app->config('url');
    }

    /**
     * Determine if file is a local css.
     *
     * @param  string $file
     * @return bool
     */
    public function isFileLocal(string $file): bool
    {
        return str_starts_with($file, $this->getForumUrl());
    }

    /**
     * Get rtl version of a file.
     *
     * @param  string $file
     * @return string
     */
    public function getFileRtl(string $file): string
    {
        // leave the file
        if (!$this->isUrl($file)) {
            return $file;
        }

        $path_info = pathinfo($file);
        $extension = $path_info['extension'] ?? '';

        // default rtlcss
        // return rtl version of file that compiled before
        if (
            $this->getSettingOption('irmmr-rtl.driver', 'rtlcss') === 'rtlcss'
            && $this->isFileLocal($file)
            && substr($extension, 0, 3) === 'css'
        ) {
            return join($this->urlSeparator, [
                $path_info['dirname'],
                $path_info['filename'] . '.rtl.' . $path_info['extension']
            ]);
        }

        return $this->assetMappingService->handleRuleWithCache($file);
    }
}