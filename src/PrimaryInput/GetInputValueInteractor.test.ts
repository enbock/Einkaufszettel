import GetInputValueInteractor, {Response} from './GetInputValueInteractor';
import FormMemory from './FormMemory/FormMemory';
import {mock, MockProxy} from 'jest-mock-extended';

describe(GetInputValueInteractor, function () {
  let formMemory: MockProxy<FormMemory>, interactor: GetInputValueInteractor;

  beforeEach(function () {
    formMemory = mock<FormMemory>();
    interactor = new GetInputValueInteractor(formMemory);
  });

  it('should take input value from temporary memory', function () {
    const inputValue: string = 'test::inputValue:';
    const expectedResponse: Response = new Response();
    expectedResponse.inputValue = inputValue;

    formMemory.readInputValue.mockReturnValueOnce(inputValue);

    const result: Response = interactor.getInputValue();

    expect(formMemory.readInputValue).toBeCalled();
    expect(result).toEqual(expectedResponse);
  });
});
