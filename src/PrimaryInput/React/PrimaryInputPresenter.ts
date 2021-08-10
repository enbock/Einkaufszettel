import PrimaryInputModel from './PrimaryInputModel';
import {Response as AddResponse} from '../AddEntryInteractor';
import {Response as GetInputResponse} from '../GetInputValueInteractor';
import {Response as SaveInputResponse} from '../SaveInputValueInteractor';

export type PresentableResponse = AddResponse | GetInputResponse | SaveInputResponse;

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
