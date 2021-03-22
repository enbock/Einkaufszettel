import SaveInputValueInteractor, {Request, Response} from './SaveInputValueInteractor';
import TemporaryMemory from './FormMemory/TemporaryMemory';

describe(SaveInputValueInteractor, function () {
  let temporaryMemory: TemporaryMemory, interactor: SaveInputValueInteractor;

  beforeEach(function () {
    temporaryMemory = {
      readInputValue: jest.fn(),
      storeInputValue: jest.fn()
    };
    interactor = new SaveInputValueInteractor(temporaryMemory);
  });

  it('should store current input value', function () {
    const newValue: string = 'test::newValue:';
    const request: Request = new Request();
    request.newInputValue = newValue;
    const expectedResponse: Response = new Response();
    expectedResponse.inputValue = newValue;

    const result: Response = interactor.saveInputValue(request);

    expect(temporaryMemory.storeInputValue).toBeCalledWith(newValue);
    expect(expectedResponse).toEqual(result);
  });
});
