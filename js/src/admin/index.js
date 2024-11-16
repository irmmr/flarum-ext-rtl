import app from 'flarum/admin/app';

app.initializers.add('irmmr-flarum-rtl-adm', () => {
  app.extensionData.for('irmmr-rtl').registerSetting({
      setting: "irmmr-rtl.lang_base",
      label: app.translator.trans(
          "irmmr-rtl.admin.settings.lang_base_label",
      ),
      type: "boolean",
      help: app.translator.trans(
        "irmmr-rtl.admin.settings.lang_base_text",
      ),
  }).registerSetting({
      setting: "irmmr-rtl.fm_status",
      label: app.translator.trans(
          "irmmr-rtl.admin.settings.fm_status_label",
      ),
      type: "boolean",
      help: app.translator.trans(
        "irmmr-rtl.admin.settings.fm_status_text",
      ),
  }).registerSetting({
      setting: "irmmr-rtl.ad_status",
      label: app.translator.trans(
          "irmmr-rtl.admin.settings.ad_status_label",
      ),
      type: "boolean",
      help: app.translator.trans(
        "irmmr-rtl.admin.settings.ad_status_text",
      ),
  });
});