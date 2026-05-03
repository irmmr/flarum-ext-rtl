import { extend } from 'flarum/common/extend';
import Navigation from 'flarum/common/components/Navigation';

export default function () {
    extend(Navigation.prototype, 'getBackButton', function (vdom) {
        if (vdom.attrs) {
            vdom.attrs.icon = 'fas fa-chevron-right';
        }
    });
}