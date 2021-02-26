import {PresentableResponse} from './PrimaryInputPresenter';

export class Response implements PresentableResponse {
  public inputValue: string = '';
}

export default class GetInputValueInteractor {
  getInputValue(): Response {
    // TODO EKZ-41 Implement interactor
    return new Response();
  }
}
