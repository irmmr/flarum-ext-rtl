<?php

namespace Irmmr\FlarumRtlSupport\Frontend\Content;

use Psr\Http\Message\ServerRequestInterface;
use Flarum\Frontend\Document;
use Irmmr\FlarumRtlSupport\Services\MirrorService;
use Irmmr\FlarumRtlSupport\Services\PayloadsService;

abstract class BaseContent
{
    /**
     * Additional styles for content.
     *
     * @var array
     */
    protected array $extraStyles = [];

    /**
     * All rtl payloads.
     *
     * @var array|null
     */
    protected ?array $rtlPayloads = null;

    /**
     * class constructor.
     *
     * @param PayloadsService $payloadsService
     */
    public function __construct(
        protected PayloadsService $payloadsService,
        protected MirrorService $mirrorService
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
     * Make css rtl.
     *
     * @param  array<string, string> $css_urls
     * @return array
     */
    protected function makeCssRtl(array $cssUrls): array
    {
        foreach ($cssUrls as $key => $file) {
            if (is_string($file)) {
                $cssUrls[$key] = $this->mirrorService->getFileRtl($file);
            }
        }

        return $cssUrls;
    }

    /**
     * Make js rtl.
     *
     * @param  array<string, string> $jsUrls
     * @return array
     */
    protected function makeJsRtl(array $jsUrls): array
    {
        foreach ($jsUrls as $key => $file) {
            if (is_string($file)) {
                $jsUrls[$key] = $this->mirrorService->getFileRtl($file);
            }
        }

        return $jsUrls;
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
            preg_match_all($this->mirrorService->stylesheetPattern, $head, $matches, PREG_SET_ORDER);

            foreach ($matches as $match) {
                $url = $match[1] ?? '';

                if ($this->mirrorService->isUrl($url)) {
                    $heads[$key] = str_replace($url, $this->mirrorService->getFileRtl($url), $head);
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
        $this->rtlPayloads ??= $this->payloadsService->getPayloads();

        foreach ($this->rtlPayloads as $key) {
            if (isset($payloads[$key])) {
                $payloads[$key] = $this->mirrorService->getFileRtl($payloads[$key]);
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

