import {PresentableResponse} from './React/PrimaryInputPresenter';
import FormMemory from './FormMemory/FormMemory';

export class Response implements PresentableResponse {
  public inputValue: string = '';
}

export default class GetInputValueInteractor {
  private readonly temporaryMemory: FormMemory;

  constructor(temporaryMemory: FormMemory) {
    this.temporaryMemory = temporaryMemory;
  }

  getInputValue(): Response {
    const response: Response = new Response();
    response.inputValue = this.temporaryMemory.readInputValue();
    return response;
  }
}
