import Tooltip from 'flarum/common/components/Tooltip';
import { extend } from 'flarum/common/extend';

export default function () {
    extend(Tooltip.prototype, 'view', function () {
        const attrs = this.attrs;

        if (!attrs || attrs['data-rtl-flipped']) return;

        if (attrs.position === 'left') {
            attrs.position = 'right';
        } else if (attrs.position === 'right') {
            attrs.position = 'left';
        }

        attrs['data-rtl-flipped'] = true;
    });
}
