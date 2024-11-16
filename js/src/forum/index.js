import changePaneShowX from './changePaneShowX';
import changeNavBackBtn from './changeNavBackBtn';
import app from 'flarum/app';

app.initializers.add('irmmr-flarum-rtl-ext', () => {
    if (document.dir === 'rtl') {
        changePaneShowX();
        changeNavBackBtn();
    }
});
