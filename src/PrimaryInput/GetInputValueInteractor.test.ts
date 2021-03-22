import GetInputValueInteractor, {Response} from './GetInputValueInteractor';
import FormMemory from './FormMemory/FormMemory';

describe(GetInputValueInteractor, function () {
  let temporaryMemory: FormMemory, interactor: GetInputValueInteractor;

  beforeEach(function () {
    temporaryMemory = {
      clearInputValue: jest.fn(),
      readInputValue: jest.fn(),
      storeInputValue: jest.fn()
    };
    interactor = new GetInputValueInteractor(temporaryMemory);
  });

  it('should take input value from temporary memory', function () {
    const inputValue: string = 'test::inputValue:';
    const expectedResponse: Response = new Response();
    expectedResponse.inputValue = inputValue;

    (temporaryMemory.readInputValue as jest.Mock).mockReturnValueOnce(inputValue);

    const result: Response = interactor.getInputValue();

    expect(temporaryMemory.readInputValue).toBeCalled();
    expect(result).toEqual(expectedResponse);
  });
});
