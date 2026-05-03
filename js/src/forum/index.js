import changePaneShowX from './changePaneShowX';
import changeNavigationBackBtn from '../common/changeNavigationBackBtn';
import app from 'flarum/forum/app';
import extendToolip from '../common/extendTooltip';

app.initializers.add('irmmr-rtl', () => {
    if (document.dir === 'rtl') {
        changePaneShowX();
        changeNavigationBackBtn();
        // extendDiscussionListItem();
        extendToolip();
    }
});
