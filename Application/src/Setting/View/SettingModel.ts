import ViewModel from '../../ViewModel';

class I18n {
    public downloadLabel: string = 'Daten exportieren';
    public uploadLabel: string = 'Daten importieren';
}

export default class SettingModel implements ViewModel {
    public i18n: I18n = new I18n();
}
