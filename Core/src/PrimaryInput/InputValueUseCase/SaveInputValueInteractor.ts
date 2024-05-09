import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';

export class Request {
    public newInputValue: string = '';
}

export default class SaveInputValueInteractor {
    private formMemory: FormMemory;

    constructor(formMemory: FormMemory) {
        this.formMemory = formMemory;
    }

    public updateInputValue(request: Request): void {
        const inputValue: string = request.newInputValue;
        this.formMemory.storeInputValue(inputValue);
    }
}
