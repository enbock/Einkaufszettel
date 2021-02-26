import {PresentableResponse} from './PrimaryInputPresenter';

export class Request {
  public newInputValue: string = '';
}

export class Response implements PresentableResponse {
  public inputValue: string = '';
}

export default class SaveInputValueInteractor {
  public saveInputValue(request: Request): Response {
    // TODO EKZ-41 Implement interactor
    return new Response();
  }
}
