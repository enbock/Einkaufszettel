import GetInputValueInteractor, {Response} from './GetInputValueInteractor';
import FormMemory from './FormMemory/FormMemory';
import {mock, MockProxy} from 'jest-mock-extended';

describe(GetInputValueInteractor, function () {
  let temporaryMemory: MockProxy<FormMemory>, interactor: GetInputValueInteractor;

  beforeEach(function () {
    temporaryMemory = mock<FormMemory>();
    interactor = new GetInputValueInteractor(temporaryMemory);
  });

  it('should take input value from temporary memory', function () {
    const inputValue: string = 'test::inputValue:';
    const expectedResponse: Response = new Response();
    expectedResponse.inputValue = inputValue;

    temporaryMemory.readInputValue.mockReturnValueOnce(inputValue);

    const result: Response = interactor.getInputValue();

    expect(temporaryMemory.readInputValue).toBeCalled();
    expect(result).toEqual(expectedResponse);
  });
});
