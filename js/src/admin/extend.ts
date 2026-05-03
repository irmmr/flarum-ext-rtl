import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';

export default [
    new Extend.Admin()
        .setting(() => ({
            setting: 'irmmr-rtl.lang_base',
            type: 'boolean',
            label: app.translator.trans('irmmr-rtl.admin.settings.lang_base_label'),
            help: app.translator.trans('irmmr-rtl.admin.settings.lang_base_text'),
        }))
        .setting(() => ({
            setting: 'irmmr-rtl.fm_status',
            type: 'boolean',
            label: app.translator.trans('irmmr-rtl.admin.settings.fm_status_label'),
            help: app.translator.trans('irmmr-rtl.admin.settings.fm_status_text'),
        }))
        .setting(() => ({
            setting: 'irmmr-rtl.ad_status',
            type: 'boolean',
            label: app.translator.trans('irmmr-rtl.admin.settings.ad_status_label'),
            help: app.translator.trans('irmmr-rtl.admin.settings.ad_status_text'),
        }))
];