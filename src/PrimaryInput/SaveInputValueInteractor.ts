import {PresentableResponse} from './PrimaryInputPresenter';
import FormMemory from './FormMemory/FormMemory';

export class Request {
  public newInputValue: string = '';
}

export class Response implements PresentableResponse {
  public inputValue: string = '';
}

export default class SaveInputValueInteractor {
  private readonly temporaryMemory: FormMemory;

  constructor(temporaryMemory: FormMemory) {
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
