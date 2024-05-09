class I18n {
    public discard: string = 'Verwerfen';
    public delete: string = 'Löschen';
    public submit: string = 'Übernehmen';
}

export default class PrimaryInputModel {
    public i18n: I18n = new I18n();
    public inputValue: string = '';
    public showSubmitButton: boolean = false;
    public showDeleteButton: boolean = false;
    public showDiscardButton: boolean = false;
}
