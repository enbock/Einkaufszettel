import FormMemory from './FormMemory/FormMemory';

export class Response {
  public inputValue: string = '';
}

export default class GetInputValueInteractor {
  constructor(private formMemory: FormMemory) {
  }

  getInputValue(): Response {
    const response: Response = new Response();
    response.inputValue = this.formMemory.readInputValue();
    return response;
  }
}
