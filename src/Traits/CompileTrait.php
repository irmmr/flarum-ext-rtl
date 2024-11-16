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
trait CompileTrait
{
    protected string $stylesheet_pattern = '/href=["\']?([^"\'>]+)["\']?/';

    /**
     * get forum url
     *
     * @return string
     */
    protected function get_forum_url(): string
    {
        return $this->app->config('url');
    }

    /**
     * @param   string $file
     * @return  string
     */
    protected function get_file_rtl(string $file): string
    {
        $path_info = pathinfo($file);

        return $path_info['dirname'] . '/' . $path_info['filename'] . '.rtl.' . $path_info['extension'];
    }

    /**
     * @param   string $file
     * @return  bool
     */
    protected function is_file_local(string $file): bool
    {
        $url   = $this->get_forum_url();

        return substr($file, 0, strlen($url)) === $url;
    }

    /**
     * make css rtl
     *
     * @param   array $css_urls
     * @return  array
     */
    protected function make_css_rtl(array $css_urls): array
    {
        $count = count($css_urls);

        for ($i = 0; $i <= $count; $i++) {
            $file = $css_urls[$i];

            // check if css file is local
            if (is_string($file) && $this->is_file_local($file)) {
                $css_urls[$i] = $this->get_file_rtl($file);
            }
        }

        return $css_urls;
    }

    /**
     * make head rtl
     *
     * @param   array $heads
     * @return  array
     */
    protected function make_head_rtl(array $heads): array
    {
        $count = count($heads);

        for ($i = 0; $i <= $count; $i++) {
            $head = $heads[$i];

            preg_match_all($this->stylesheet_pattern, $head, $matches, PREG_SET_ORDER);

            foreach ($matches as $match) {
                $url = $match[1] ?? '';

                if (filter_var($url, FILTER_SANITIZE_URL) && $this->is_file_local($url)) {
                    $heads[$i] = str_replace($url, $this->get_file_rtl($url), $head);
                }
            }
        }

        return $heads;
    }

    /**
     * make payload rtl
     * !! need improvement
     *
     * @param   array $payloads
     * @return  array
     */
    protected function make_payload_rtl(array $payloads): array
    {
        // ! fof-nightmode
        if (isset($payloads['fof-nightmode.assets.day'])) {
            $payloads['fof-nightmode.assets.day'] = $this->get_file_rtl($payloads['fof-nightmode.assets.day']);
        }

        if (isset($payloads['fof-nightmode.assets.night'])) {
            $payloads['fof-nightmode.assets.night'] = $this->get_file_rtl($payloads['fof-nightmode.assets.night']);
        }

        return $payloads;
    }
}