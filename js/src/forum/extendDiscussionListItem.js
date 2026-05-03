import { extend } from 'flarum/common/extend';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';

export default function () {
    extend(DiscussionListItem.prototype, 'authorItems', function (items) {
        const avatarItem = items.get('avatar');
        if (!avatarItem) return;

        const vnode = avatarItem;
        if (!vnode.attrs || vnode.attrs['data-rtl-flipped']) return;

        const current = vnode.attrs.position;

        if (current !== 'left' && current !== 'right') return;

        vnode.attrs.position = current === 'left' ? 'right' : 'left';
        vnode.attrs['data-rtl-flipped'] = 'true';
    });
}
