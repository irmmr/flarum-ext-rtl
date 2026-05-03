import app from 'flarum/admin/app';
import changeNavigationBackBtn from '../common/changeNavigationBackBtn';
import changePaginationIcons from '../common/changePaginationIcons';
import extendToolip from '../common/extendTooltip';

export { default as extend } from './extend';

app.initializers.add('irmmr-rtl', () => {
    if (document.dir === 'rtl') {
        changeNavigationBackBtn();
        changePaginationIcons();
        extendToolip();
    }
});