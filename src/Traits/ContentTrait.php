<?php
/*
 * This file is part of Flarum RTL support extension.
 *
 * (c)  Irmmr <irmmr.ir@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Irmmr\FlarumRtlSupport\Traits;

use Flarum\Frontend\Document;

/**
 * trait LangTrait
 */
trait ContentTrait
{
    /**
     * @var array $rtl_langs
     */
    protected array $rtl_langs = [
        'fa',
        'ar',
        'he'
    ];

    /**
     * check RTL support based on language
     *
     * @param   string $language
     * @return  bool
     */
    protected function lang_support_rtl(string $language): bool
    {
        return in_array($language, $this->rtl_langs, true);
    }

    /**
     * get setting
     *
     * @param   string  $key
     * @param   mixed   $default
     * @return  mixed
     */
    protected function get_setting_op(string $key, $default = null)
    {
        $data = $this->settings->get($key) ?? $default;

        if (is_string($data)) {
            return trim($data);
        }

        return $data;
    }

    /**
     * check whole rtl status
     *
     * @param Document  $document
     * @param string    $view
     * @return bool
     */
    protected function is_rtl_active(Document $document, string $view): bool
    {
        $status_setting = $view === 'forum' ? 'irmmr-rtl.fm_status' : 'irmmr-rtl.ad_status';
        $active = $this->settings->get($status_setting, true);

        if ($active && $this->get_setting_op('irmmr-rtl.lang_base', true)) {
            $active = $this->lang_support_rtl( $document->language ?? 'en' );
        }

        return $active;
    }
}