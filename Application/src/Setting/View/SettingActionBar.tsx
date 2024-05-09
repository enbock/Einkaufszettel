import Component from '@enbock/ts-jsx/Component';
import RootView from 'Application/RootView';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Style from 'Application/Setting/View/Style.css';
import SettingActionBarModel from 'Application/Setting/View/SettingActionBarModel';

export interface Properties {
}

export default class SettingActionBar extends Component<Properties> implements RootView {
    private modelInstance: SettingActionBarModel = new SettingActionBarModel();

    public set model(value: SettingActionBarModel) {
        this.modelInstance = value;
        this.renderShadow();
    }

    public render(): ShadowDomElement | ShadowDomElement[] {
        return <>
            <style>{Style}</style>
        </>;
    }
}
