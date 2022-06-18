import FormMemory from './FormMemory/FormMemory';

export class Request {
    public newInputValue: string = '';
}

export default class SaveInputValueInteractor {
    private readonly formMemory: FormMemory;

    constructor(formMemory: FormMemory) {
        this.formMemory = formMemory;
    }

    public saveInputValue(request: Request): void {
        const inputValue: string = request.newInputValue;
        this.formMemory.storeInputValue(inputValue);
    }
}
