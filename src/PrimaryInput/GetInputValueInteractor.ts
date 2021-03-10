import {PresentableResponse} from './PrimaryInputPresenter';
import TemporaryMemory from './TemporaryMemory/TemporaryMemory';

export class Response implements PresentableResponse {
  public inputValue: string = '';
}

export default class GetInputValueInteractor {
  private readonly temporaryMemory: TemporaryMemory;

  constructor(temporaryMemory: TemporaryMemory) {
    this.temporaryMemory = temporaryMemory;
  }

  getInputValue(): Response {
    const response: Response = new Response();
    response.inputValue = this.temporaryMemory.readInputValue();
    return response;
  }
}
