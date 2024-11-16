<?php
/*
 * This file is part of Flarum RTL support extension.
 *
 * (c)  Irmmr <irmmr.ir@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Irmmr\FlarumRtlSupport\Interfaces;

/**
 * interface StyleInterface
 */
interface StyleInterface
{
    /**
     * list of all styles must be add to head tags
     *
     * @var  array
     */
    public const HEAD_STYLES = [
        // fof/gamification: old method
        // ".DiscussionListItem--withVotes .DiscussionListItem-main .item-tags {left: 122px !important;right: auto !important;}"
    ];
}
