import SaveInputValueInteractor, {Request} from './SaveInputValueInteractor';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import createSpy = jasmine.createSpy;

describe('SaveInputValueInteractor', function (): void {
    let temporaryMemory: FormMemory, interactor: SaveInputValueInteractor;

    beforeEach(function (): void {
        temporaryMemory = {
            clearInputValue: createSpy(),
            readInputValue: createSpy(),
            storeInputValue: createSpy()
        };
        interactor = new SaveInputValueInteractor(temporaryMemory);
    });

    it('should store current input value', async function (): Promise<void> {
        const newValue: string = 'test::newValue:';
        const request: Request = new Request();
        request.newInputValue = newValue;

        interactor.updateInputValue(request);

        expect(temporaryMemory.storeInputValue).toHaveBeenCalledWith(newValue);
    });
});
