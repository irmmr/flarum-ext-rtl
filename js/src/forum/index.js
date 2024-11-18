import changePaneShowX from './changePaneShowX';
import changeNavBackBtn from '../common/changeNavBackBtn';
import app from 'flarum/app';

app.initializers.add('irmmr-flarum-rtl-ext', () => {
    if (document.dir === 'rtl') {
        changePaneShowX();
        changeNavBackBtn();
    }
});
