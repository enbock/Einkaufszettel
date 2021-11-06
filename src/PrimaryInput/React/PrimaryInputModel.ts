interface I18n {
  discard: string;
  delete: string;
}

export default class PrimaryInputModel {
  public inputValue: string = '';
  public showSubmitButton: boolean = false;
  public showDiscardButton: boolean = false;
  public i18n: I18n = {
    discard: 'Verwerfen',
    delete: 'Löschen'
  };
  public discardLabel: string = '';
}
