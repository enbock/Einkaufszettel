import {PresentableResponse} from './PrimaryInputPresenter';
import TemporaryMemory from './FormMemory/TemporaryMemory';

export class Request {
  public newInputValue: string = '';
}

export class Response implements PresentableResponse {
  public inputValue: string = '';
}

export default class SaveInputValueInteractor {
  private readonly temporaryMemory: TemporaryMemory;

  constructor(temporaryMemory: TemporaryMemory) {
    this.temporaryMemory = temporaryMemory;
  }

  public saveInputValue(request: Request): Response {
    const inputValue: string = request.newInputValue;
    this.temporaryMemory.storeInputValue(inputValue);

    const response: Response = new Response();
    response.inputValue = inputValue;

    return response;
  }
}
