import SaveInputValueInteractor, {Request} from './SaveInputValueInteractor';
import FormMemory from './FormMemory/FormMemory';

describe(SaveInputValueInteractor, function () {
  let temporaryMemory: FormMemory, interactor: SaveInputValueInteractor;

  beforeEach(function () {
    temporaryMemory = {
      clearInputValue: jest.fn(),
      readInputValue: jest.fn(),
      storeInputValue: jest.fn()
    };
    interactor = new SaveInputValueInteractor(temporaryMemory);
  });

  it('should store current input value', function () {
    const newValue: string = 'test::newValue:';
    const request: Request = new Request();
    request.newInputValue = newValue;

    interactor.saveInputValue(request);

    expect(temporaryMemory.storeInputValue).toBeCalledWith(newValue);
  });
});
