import PrimaryInputModel from './PrimaryInputModel';

export interface PresentableResponse {
  inputValue: string;
}

export default class PrimaryInputPresenter {
  public present(response: PresentableResponse): PrimaryInputModel {
    const model: PrimaryInputModel = new PrimaryInputModel();
    model.inputValue = response.inputValue.trimLeft();
    const showButtons: boolean = response.inputValue.trim().length > 0;
    model.showDiscardButton = showButtons;
    model.showSubmitButton = showButtons;
    return model;
  }
}
