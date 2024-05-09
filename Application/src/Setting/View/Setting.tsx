import Component from '@enbock/ts-jsx/Component';
import RootView from '../../RootView';
import SettingModel from './SettingModel';

export interface Properties {
}

export default class Setting extends Component<Properties> implements RootView {
    private modelInstance: SettingModel = new SettingModel();

    public set model(value: SettingModel) {
        this.modelInstance = value;
        this.renderShadow();
    }
}
