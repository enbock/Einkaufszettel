import PrimaryInputController from './PrimaryInputController';
import AddEntryInteractor from './AddEntryInteractor';
import PrimaryInputAdapter from './PrimaryInputAdapter';
import PrimaryInput from './PrimaryInput';
import PrimaryInputPresenter, {PresentableResponse} from './PrimaryInputPresenter';
import PrimaryInputModel from './PrimaryInputModel';
import SaveInputValueInteractor, {Request as SaveRequest} from './SaveInputValueInteractor';
import GetInputValueInteractor from './GetInputValueInteractor';

describe(PrimaryInputController, function () {
  let adapter: PrimaryInputAdapter, controller: PrimaryInputController, addEntryInteractor: AddEntryInteractor,
    primaryInput: PrimaryInput, presenter: PrimaryInputPresenter, saveInputValueInteractor: SaveInputValueInteractor,
    getInputValueInteractor: GetInputValueInteractor;

  beforeEach(function () {
    adapter = new PrimaryInputAdapter();
    addEntryInteractor = {
      addNewEntry: jest.fn()
    };
    saveInputValueInteractor = {
      saveInputValue: jest.fn()
    };
    getInputValueInteractor = {
      getInputValue: jest.fn()
    };
    presenter = {
      present: jest.fn()
    };
    controller = new PrimaryInputController(
      adapter,
      addEntryInteractor,
      saveInputValueInteractor,
      getInputValueInteractor,
      presenter
    );
    primaryInput = {model: undefined} as unknown as PrimaryInput;
  });

  it('should create new entry on incoming submit', function () {
    const response: PresentableResponse = {test: 'response'};
    const model: PrimaryInputModel = new PrimaryInputModel();
    model.inputValue = 'test';
    const getValueResponse: PresentableResponse = {test: 'response'};

    (addEntryInteractor.addNewEntry as jest.Mock).mockReturnValueOnce(response);
    prepareMocksAndAttachView(getValueResponse, model);

    adapter.onSubmit();

    expect(addEntryInteractor.addNewEntry).toBeCalled();
    expect(presenter.present).toBeCalledWith(response);
    expect(presenter.present).toBeCalledWith(getValueResponse);
    expect(primaryInput.model).toBe(model);
  });

  function prepareMocksAndAttachView(getValueResponse: PresentableResponse, model: PrimaryInputModel) {
    (getInputValueInteractor.getInputValue as jest.Mock).mockReturnValueOnce(getValueResponse);
    (presenter.present as jest.Mock).mockReturnValueOnce(new PrimaryInputModel());
    (presenter.present as jest.Mock).mockReturnValueOnce(model);

    controller.attach(primaryInput as any);
  }

  it('should take new value of input field', function () {
    const expectedRequest: SaveRequest = new SaveRequest();
    expectedRequest.newInputValue = 'test::newValue:';
    const getValueResponse: PresentableResponse = {test: 'response'};
    const response: PresentableResponse = {test: 'response'};
    const model: PrimaryInputModel = new PrimaryInputModel();
    model.inputValue = 'test';

    (saveInputValueInteractor.saveInputValue as jest.Mock).mockReturnValueOnce(response);
    prepareMocksAndAttachView(getValueResponse, model);

    adapter.onInputChange('test::newValue:');

    expect(saveInputValueInteractor.saveInputValue).toBeCalledWith(expectedRequest);
    expect(presenter.present).toBeCalledWith(getValueResponse);
    expect(presenter.present).toBeCalledWith(response);
    expect(primaryInput.model).toBe(model);
  });

  it('should show current input value', function () {
    const response: PresentableResponse = {test: 'response'};
    const model: PrimaryInputModel = new PrimaryInputModel();
    model.inputValue = 'test';

    (getInputValueInteractor.getInputValue as jest.Mock).mockReturnValueOnce(response);
    (presenter.present as jest.Mock).mockReturnValueOnce(model);

    controller.attach(primaryInput as any);

    expect(getInputValueInteractor.getInputValue).toBeCalled();
    expect(presenter.present).toBeCalledWith(response);
    expect(primaryInput.model).toBe(model);
  });
});
