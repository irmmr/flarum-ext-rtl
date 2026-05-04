import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Stream from 'flarum/common/utils/Stream';
import Form from 'flarum/common/components/Form';
import Select from 'flarum/common/components/Select';
import Button from 'flarum/common/components/Button';
import FormSection from 'flarum/admin/components/FormSection';
import FormSectionGroup from 'flarum/admin/components/FormSectionGroup';

type AssetRuleType = 'css' | 'js' | 'auto';

type AssetRule = {
    pattern: string,
    replace: string,
    type: AssetRuleType
}

function convertToList(raw: string|Array<any>): Array<any> {
    if (!raw) {
        return [];
    }

    if (typeof raw === 'string') {
        return JSON.parse(raw) as Array<AssetRule>;
    }

    return raw;
}

export default class RtlSettingsPage extends ExtensionPage {
    rules!: Stream<AssetRule[]>;
    payloads!: Stream<string>;
    forcedRefreshKey!: number;
    loading!: boolean;

    oninit(vnode) {
        super.oninit(vnode);

        this.forcedRefreshKey = 0;

        this.loading = false;

        const rules = this.setting('irmmr-rtl.asset_rules')();
        this.rules = Stream(convertToList(rules));

        const payloads = this.setting('irmmr-rtl.payloads')();
        this.payloads = Stream(convertToList(payloads));
    }

    addRule() {
        const rule: AssetRule = { pattern: '', replace: '', type: 'css' };
        this.rules([...this.rules(), rule]);
    }

    removeRule(index: number) {
        const rules = [...this.rules()];
        rules.splice(index, 1);
        this.rules(rules);

        this.updateAssetRulesSettings();
    }

    addPayload() {
        this.payloads([...this.payloads(), '']);
    }

    removePayload(index: number) {
        const payloads = [...this.payloads()];
        payloads.splice(index, 1);
        this.payloads(payloads);

        this.updatePayloadsSettings();
    }

    updateRule(index: number, field: string, value: string) {
        const rules = [...this.rules()];
        rules[index][field.trim()] = value.trim();
        this.rules(rules);

        this.updateAssetRulesSettings();
    }

    updatePayload(index: number, value: string) {
        const payloads = [...this.payloads()];
        payloads[index] = value.trim();
        this.payloads(payloads);

        this.updatePayloadsSettings();
    }

    updateAssetRulesSettings() {
        const rules = this.rules()
            .filter((i: AssetRule) => i.pattern.trim() !== '' && i.replace.trim() !== '' && ['css', 'js', 'auto'].includes(i.type));

        this.setting('irmmr-rtl.asset_rules')(
            JSON.stringify(rules)
        );
    }

    updatePayloadsSettings() {
        const payloads = this.payloads().filter((i: string) => i !== '');

        this.setting('irmmr-rtl.payloads')(
            JSON.stringify(payloads)
        );
    }

    content() {
        return (
            <div className="RtlSettings-page">
                <div className="container" key={this.forcedRefreshKey}>
                    <Form>
                        {this.buildSettingComponent({
                            type: 'boolean',
                            setting: 'irmmr-rtl.lang_base',
                            label: app.translator.trans('irmmr-rtl.admin.settings.lang_base_label'),
                            help: app.translator.trans('irmmr-rtl.admin.settings.lang_base_text'),
                        })}

                        {this.buildSettingComponent({
                            type: 'text',
                            setting: 'irmmr-rtl.rtl_languages',
                            label: app.translator.trans('irmmr-rtl.admin.settings.rtl_languages_label'),
                            help: app.translator.trans('irmmr-rtl.admin.settings.rtl_languages_text'),
                            placeholder: app.translator.trans('irmmr-rtl.admin.settings.rtl_languages_placeholder'),
                        })}

                        {this.buildSettingComponent({
                            type: 'boolean',
                            setting: 'irmmr-rtl.fm_status',
                            label: app.translator.trans('irmmr-rtl.admin.settings.fm_status_label'),
                            help: app.translator.trans('irmmr-rtl.admin.settings.fm_status_text'),
                        })}

                        {this.buildSettingComponent({
                            type: 'boolean',
                            setting: 'irmmr-rtl.ad_status',
                            label: app.translator.trans('irmmr-rtl.admin.settings.ad_status_label'),
                            help: app.translator.trans('irmmr-rtl.admin.settings.ad_status_text'),
                        })}

                        {this.buildSettingComponent({
                            type: 'boolean',
                            setting: 'irmmr-rtl.css_minify',
                            label: app.translator.trans('irmmr-rtl.admin.settings.minify_label'),
                            help: app.translator.trans('irmmr-rtl.admin.settings.minify_text'),
                        })}

                        {this.buildSettingComponent({
                            type: 'select',
                            setting: 'irmmr-rtl.driver',
                            label: app.translator.trans('irmmr-rtl.admin.settings.driver_label'),
                            help: app.translator.trans('irmmr-rtl.admin.settings.driver_text'),
                            options: {
                                rtlcss: app.translator.trans('irmmr-rtl.admin.settings.driver_options.rtlcss'),
                                custom: app.translator.trans('irmmr-rtl.admin.settings.driver_options.custom')
                            }
                        })}
                    </Form>

                    <hr />

                    <FormSectionGroup className="RtlSectionGroup">
                        <FormSection className="RtlGroup" label={app.translator.trans('irmmr-rtl.admin.settings.mappings.section_title')}>
                            <div className="RtlList">

                                {this.rules().length ? this.rules().map((rule: AssetRule, i: number) => (
                                    <div className="AssetRuleItem" key={i}>
                                        <input
                                            className="FormControl AssetRuleItem-pattern ForceLtrField"
                                            placeholder={app.translator.trans('irmmr-rtl.admin.settings.mappings.pattern_placeholder')}
                                            value={rule.pattern}
                                            onchange={(e: any) => this.updateRule(i, 'pattern', e.target.value)}
                                        />
                                        <input
                                            className="FormControl AssetRuleItem-replace ForceLtrField"
                                            placeholder={app.translator.trans('irmmr-rtl.admin.settings.mappings.replace_placeholder')}
                                            value={rule.replace}
                                            onchange={(e: any) => this.updateRule(i, 'replace', e.target.value)}
                                        />
                                        <Select
                                            className="AssetRuleItem-type"
                                            value={rule.type || 'css'}
                                            onchange={(selected: any) => this.updateRule(i, 'type', selected)}
                                            options={{
                                                auto: app.translator.trans('irmmr-rtl.admin.settings.mappings.type_options.auto'),
                                                css: app.translator.trans('irmmr-rtl.admin.settings.mappings.type_options.css'),
                                                js: app.translator.trans('irmmr-rtl.admin.settings.mappings.type_options.js')
                                            }}
                                        />
                                        <Button
                                            icon="fas fa-times"
                                            onclick={() => this.removeRule(i)}
                                            className="Button Button--icon Button--danger AssetRuleItem-remove"
                                        />
                                    </div>
                                )) : (<p className="RtlList-empty"><i className="fa-solid fa-diagram-project"></i><span>{app.translator.trans('irmmr-rtl.admin.settings.mappings.empty_text')}</span></p>)}

                            </div>
                            <div className="Form-controls">
                                <Button className="Button RtlList-button" icon="fas fa-plus" onclick={() => this.addRule()}>
                                    {app.translator.trans('irmmr-rtl.admin.settings.mappings.add_button')}
                                </Button>
                            </div>

                            <div className="RtlGroupText helpText">
                                {app.translator.trans('irmmr-rtl.admin.settings.mappings.help_text')}
                            </div>
                        </FormSection>

                        <FormSection className="RtlGroup" label={app.translator.trans('irmmr-rtl.admin.settings.payloads.section_title')}>
                            <div className="RtlList">

                                {this.payloads().length ? this.payloads().map((payload: string, i: number) => (
                                    <div className="PayloadItem ForceLtrField" key={i}>
                                        <input
                                            className="FormControl Payload-value ForceLtrField"
                                            placeholder={app.translator.trans('irmmr-rtl.admin.settings.payloads.placeholder')}
                                            value={payload}
                                            onchange={(e: any) => this.updatePayload(i, e.target.value)}
                                        />
                                        <Button
                                            icon="fas fa-times"
                                            onclick={() => this.removePayload(i)}
                                            className="Button Button--icon Button--danger Payload-remove"
                                        />
                                    </div>
                                )) : (<p className="RtlList-empty"><i className="fa-regular fa-folder-open"></i><span>{app.translator.trans('irmmr-rtl.admin.settings.payloads.empty_text')}</span></p>)}

                            </div>
                            <div className="Form-controls">
                                <Button className="Button RtlList-button" icon="fas fa-plus" onclick={() => this.addPayload()}>
                                    {app.translator.trans('irmmr-rtl.admin.settings.payloads.add_button')}
                                </Button>
                            </div>

                            <div className="RtlGroupText helpText">
                                {app.translator.trans('irmmr-rtl.admin.settings.payloads.help_text')}
                            </div>
                        </FormSection>
                    </FormSectionGroup>

                    <div className="Form-group Form-controls" style={{marginTop: '25px'}}>
                        {this.submitButton()}
                    </div>
                </div>
            </div>
        );
    }
}