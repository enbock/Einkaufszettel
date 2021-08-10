import PrimaryInputModel from './PrimaryInputModel';

export interface PresentableResponse {
  inputValue: string;
}

export default class PrimaryInputPresenter {
  public present(response: PresentableResponse): PrimaryInputModel {
    const model: PrimaryInputModel = new PrimaryInputModel();
    model.inputValue = response.inputValue;
    return model;
  }
}
