import SettingModel from './SettingModel';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Style from './Style.css';
import RootComponent from 'Application/RootComponent';
import {ComponentProperties} from '@enbock/ts-jsx/Component';
import Adapter from 'Application/Setting/Adapter';

export default class Setting extends RootComponent {
    private modelInstance: SettingModel = new SettingModel();
    private fileToUpload: File | undefined;

    constructor(
        props: ComponentProperties,
        private adapter: Adapter
    ) {
        super(props);
    }

    public get model(): SettingModel {
        return this.modelInstance;
    }

    public set model(value: SettingModel) {
        this.modelInstance = value;
        this.renderShadow();
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

                <input type="file" onChange={this.handleFileInput.bind(this)}/>
                <button
                    onClick={this.handleUpload.bind(this)}
                >
                    <icon upload/>
                    {this.model.i18n.uploadLabel}
                </button>
            </main>
        </>;
    }

    private handleFileInput(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.fileToUpload = input.files[0];
        } else {
            this.fileToUpload = undefined;
        }
    }

    private handleUpload(): void {
        if (!this.fileToUpload) return;

        void this.adapter.onUpload(this.fileToUpload);
    }
}
