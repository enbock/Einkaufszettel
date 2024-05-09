import SettingModel from './SettingModel';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Style from './Style.css';
import RootComponent from 'Application/RootComponent';
import {ComponentProperties} from '@enbock/ts-jsx/Component';
import Adapter from 'Application/Setting/Adapter';

export default class Setting extends RootComponent {
    private modelInstance: SettingModel = new SettingModel();

    constructor(
        props: ComponentProperties,
        private adapter: Adapter
    ) {
        super(props);
    }

    public set model(value: SettingModel) {
        this.modelInstance = value;
        this.renderShadow();
    }

    public get model(): SettingModel {
        return this.modelInstance;
    }

    public render(): ShadowDomElement | ShadowDomElement[] {
        return <>
            <style>{Style}</style>
            <main>
                <button
                    onClick={() => this.adapter.onDownload()}
                >
                    <icon download/>
                    {this.model.i18n.downloadLabel}
                </button>
                <button
                    onClick={() => this.adapter.onUpload()}
                >
                    <icon upload/>
                    {this.model.i18n.uploadLabel}
                </button>
            </main>
        </>;
    }
}
