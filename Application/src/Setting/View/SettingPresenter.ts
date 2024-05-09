import SettingModel from 'Application/Setting/View/SettingModel';

export default class SettingPresenter {
    public present(): SettingModel {
        return new SettingModel();
    }
}
