<?php
/*
 * This file is part of Flarum RTL support extension.
 *
 * (c)  Irmmr <irmmr.ir@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Irmmr\FlarumRtlSupport\Frontend\Content;

use Flarum\Frontend\Document;
//use Illuminate\Contracts\Cache\Repository as Cache;
use Irmmr\FlarumRtlSupport\Traits\CompileTrait;
use Irmmr\FlarumRtlSupport\Traits\ContentTrait;
use Psr\Http\Message\ServerRequestInterface;
//use Psr\Log\LoggerInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Irmmr\FlarumRtlSupport\Interfaces\StyleInterface;
use Flarum\Foundation\Application;

/**
 * class ForumContent
 *
 * change some simple parts of header and
 * front tags.
 */
class ForumContent implements StyleInterface
{
    use ContentTrait, CompileTrait;
//    /**
//     * @var Cache
//     */
//    protected Cache $cache;
//
//    /**
//     * @var LoggerInterface
//     */
//    protected LoggerInterface $logger;

    /**
     * @var SettingsRepositoryInterface
     */
    protected SettingsRepositoryInterface $settings;

    /**
     * @var Application
     */
    protected Application $app;

    /**
     * class constructor.
     */
    public function __construct(SettingsRepositoryInterface $settings, Application $app/*, Cache $cache, LoggerInterface $logger*/)
    {
//        $this->cache  = $cache;
//        $this->logger = $logger;

        $this->settings = $settings;
        $this->app      = $app;
    }

    /**
     * @param Document                  $document
     * @param ServerRequestInterface    $request
     */
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        if (!$this->is_rtl_active($document, 'forum')) {
            return;
        }

        $document->direction = 'rtl';

        $document->css      = $this->make_css_rtl($document->css);
        $document->head     = $this->make_head_rtl($document->head);
        $document->payload  = $this->make_payload_rtl($document->payload);

        $this->add_styles($document);
    }

    /**
     * add some extra styles in header
     *
     * @param   Document  $document
     * @return  void
     */
    protected function add_styles(Document $document): void
    {
        foreach (self::HEAD_STYLES as $style) {
            $document->head[] = "<style>{$style}</style>";
        }
    }
}