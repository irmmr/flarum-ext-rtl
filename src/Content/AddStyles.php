<?php
/*
 * This file is part of Flarum RTL support extension.
 *
 * (c)  Irmmr <irmmr.ir@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Irmmr\FlarumRtlSupport\Content;

use Flarum\Frontend\Document;
use Illuminate\Contracts\Cache\Repository as Cache;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;

/**
 * class AddStyles
 * 
 * first move
 * add some styles to html header
 */
class AddStyles
{
    /**
     * @var Cache
     */
    protected $cache;

    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * @var array
     */
    protected array $styles = [
        ".DiscussionListItem--withVotes .DiscussionListItem-main .item-tags {left: 122px !important;right: auto !important;}"
    ];

    public function __construct(Cache $cache, LoggerInterface $logger)
    {
        $this->cache = $cache;
        $this->logger = $logger;
    }

    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        foreach ($this->styles as $style) {
            $document->head[] = "<style>{$style}</style>";
        }
    }
}