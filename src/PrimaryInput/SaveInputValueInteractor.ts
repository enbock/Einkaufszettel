import FormMemory from './FormMemory/FormMemory';

export class Request {
  public newInputValue: string = '';
}

export class Response {
  public inputValue: string = '';
}

export default class SaveInputValueInteractor {
  private readonly formMemory: FormMemory;

  constructor(formMemory: FormMemory) {
    this.formMemory = formMemory;
  }

  public saveInputValue(request: Request): Response {
    const inputValue: string = request.newInputValue;
    this.formMemory.storeInputValue(inputValue);

    const response: Response = new Response();
    response.inputValue = inputValue;

    return response;
  }
}
