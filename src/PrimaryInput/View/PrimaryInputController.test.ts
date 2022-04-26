import PrimaryInputController from './PrimaryInputController';
import ListInteractor from '../../BuyingList/ListInteractor';
import PrimaryInputAdapter from './PrimaryInputAdapter';
import PrimaryInput from './PrimaryInput';
import PrimaryInputPresenter from './PrimaryInputPresenter';
import PrimaryInputModel from './PrimaryInputModel';
import SaveInputValueInteractor, {Request as SaveRequest} from '../SaveInputValueInteractor';
import LoadInteractor, {LoadResponse} from '../LoadInteractor';
import {Adapter as BuyingListAdapter} from '../../BuyingList/View/BuyingListController';
import {mock, MockProxy} from 'jest-mock-extended';
import RemoveInteractor from '../RemoveInteractor';

describe(PrimaryInputController, function () {
    let adapter: PrimaryInputAdapter,
        controller: PrimaryInputController,
        addEntryInteractor: ListInteractor & MockProxy<ListInteractor>,
        primaryInput: PrimaryInput,
        presenter: PrimaryInputPresenter & MockProxy<PrimaryInputPresenter>,
        saveInputValueInteractor: SaveInputValueInteractor & MockProxy<SaveInputValueInteractor>,
        loadInteractor: LoadInteractor & MockProxy<LoadInteractor>,
        entireListControllerAdapter: BuyingListAdapter & MockProxy<BuyingListAdapter>,
        removeInteractor: RemoveInteractor & MockProxy<RemoveInteractor>;

    beforeEach(function () {
        adapter = new PrimaryInputAdapter();
        addEntryInteractor = mock<ListInteractor>();
        saveInputValueInteractor = mock<SaveInputValueInteractor>();
        loadInteractor = mock<LoadInteractor>();
        presenter = mock<PrimaryInputPresenter>();
        entireListControllerAdapter = mock<BuyingListAdapter>();
        removeInteractor = mock<RemoveInteractor>();

        controller = new PrimaryInputController(
            adapter,
            addEntryInteractor,
            saveInputValueInteractor,
            loadInteractor,
            presenter,
            entireListControllerAdapter,
            removeInteractor
        );
        primaryInput = {model: undefined} as unknown as PrimaryInput;
    });

    it('should create new entry on incoming submit and inform entire list about', function () {
        const response: LoadResponse = 'test::load-response' as any;
        const model: PrimaryInputModel = new PrimaryInputModel();
        model.inputValue = 'test';

        addEntryInteractor.saveEntry.mockReturnValueOnce();
        prepareMocksAndAttachView(response, model);

        adapter.onSubmit();

        expect(addEntryInteractor.saveEntry).toBeCalled();
        expect(presenter.present).toBeCalledWith(response);
        expect(presenter.present).toBeCalledTimes(2);
        expect(primaryInput.model).toBe(model);
        expect(entireListControllerAdapter.onListChange).toBeCalled();
    });

    function prepareMocksAndAttachView(loadResponse: LoadResponse, model: PrimaryInputModel) {
        (loadInteractor.loadData as jest.Mock).mockReturnValueOnce(loadResponse);
        (presenter.present as jest.Mock).mockReturnValueOnce(new PrimaryInputModel());
        (presenter.present as jest.Mock).mockReturnValueOnce(model);

        controller.attach(primaryInput as any);
    }

    it('should take new value of input field', function () {
        const expectedRequest: SaveRequest = new SaveRequest();
        expectedRequest.newInputValue = 'test::newValue:';
        const model: PrimaryInputModel = new PrimaryInputModel();
        model.inputValue = 'test';

        saveInputValueInteractor.saveInputValue.mockReturnValueOnce();
        prepareMocksAndAttachView('test::load-response:' as any, model);

        adapter.onInputChange('test::newValue:');

        expect(saveInputValueInteractor.saveInputValue).toBeCalledWith(expectedRequest);
        expect(presenter.present).toBeCalledWith('test::load-response:');
        expect(presenter.present).toBeCalledTimes(2);
        expect(primaryInput.model).toBe(model);
        expect(entireListControllerAdapter.onFormInput).toBeCalled();
    });

    it('should show current input value', function () {
        const model: PrimaryInputModel = new PrimaryInputModel();
        model.inputValue = 'test';

        loadInteractor.loadData.mockReturnValueOnce('test::load-response:' as any);
        (presenter.present as jest.Mock).mockReturnValueOnce(model);

        controller.attach(primaryInput as any);

        expect(loadInteractor.loadData).toBeCalled();
        expect(presenter.present).toBeCalledWith('test::load-response:');
        expect(primaryInput.model).toBe(model);
    });

    it('should show current input value', function () {
        presenter.present.mockReturnValueOnce(new PrimaryInputModel());

        controller.attach(primaryInput as any);
        adapter.onDiscard();

        expect(removeInteractor.deleteOrDiscardEntry).toBeCalled();
        expect(presenter.present).toBeCalledTimes(2);
        expect(loadInteractor.loadData).toBeCalledTimes(2);
        expect(entireListControllerAdapter.onListChange).toBeCalled();
    });
});
