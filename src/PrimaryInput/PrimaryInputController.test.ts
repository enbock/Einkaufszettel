import PrimaryInputController from './PrimaryInputController';
import ListInteractor from '../BuyingList/ListInteractor';
import PrimaryInputAdapter from './PrimaryInputAdapter';
import SaveInputValueInteractor, {Request as SaveRequest} from './SaveInputValueInteractor';
import LoadInteractor from './LoadInteractor';
import {mock, MockProxy} from 'jest-mock-extended';
import RemoveInteractor from './RemoveInteractor';
import BuyingListAdapter from '../BuyingList/BuyingListAdapter';
import Presenter from './Presenter';
import RootView from '../RootView';

describe(PrimaryInputController, function () {
    let adapter: PrimaryInputAdapter,
        controller: PrimaryInputController,
        addEntryInteractor: ListInteractor & MockProxy<ListInteractor>,
        primaryInput: RootView,
        presenter: Presenter & MockProxy<Presenter>,
        saveInputValueInteractor: SaveInputValueInteractor & MockProxy<SaveInputValueInteractor>,
        loadInteractor: LoadInteractor & MockProxy<LoadInteractor>,
        entireListControllerAdapter: BuyingListAdapter & MockProxy<BuyingListAdapter>,
        removeInteractor: RemoveInteractor & MockProxy<RemoveInteractor>;

    beforeEach(function () {
        adapter = new PrimaryInputAdapter();
        addEntryInteractor = mock<ListInteractor>();
        saveInputValueInteractor = mock<SaveInputValueInteractor>();
        loadInteractor = mock<LoadInteractor>();
        presenter = mock<Presenter>();
        entireListControllerAdapter = mock<BuyingListAdapter>();
        removeInteractor = mock<RemoveInteractor>();
        primaryInput = mock<RootView>();

        controller = new PrimaryInputController(
            adapter,
            addEntryInteractor,
            saveInputValueInteractor,
            loadInteractor,
            presenter,
            entireListControllerAdapter,
            removeInteractor
        );
    });

    it('should create new entry on incoming submit and inform entire list about', function () {
        addEntryInteractor.saveEntry.mockReturnValueOnce();
        prepareMocksAndAttachView();

        adapter.onSubmit();

        expect(addEntryInteractor.saveEntry).toBeCalled();
        expect(presenter.present).toBeCalledWith('test::response:');
        expect(presenter.present).toBeCalledTimes(2);
        expect(primaryInput.model).toBe('test::model:');
        expect(entireListControllerAdapter.onListChange).toBeCalled();
    });

    function prepareMocksAndAttachView() {
        (loadInteractor.loadData as jest.Mock).mockReturnValue('test::response:');
        (presenter.present as jest.Mock).mockReturnValue('test::model:');

        controller.attach(primaryInput);
    }

    it('should take new value of input field', function () {
        const expectedRequest: SaveRequest = new SaveRequest();
        expectedRequest.newInputValue = 'test::newValue:';

        saveInputValueInteractor.saveInputValue.mockReturnValue();
        prepareMocksAndAttachView();

        adapter.onInputChange('test::newValue:');

        expect(saveInputValueInteractor.saveInputValue).toBeCalledWith(expectedRequest);
        expect(presenter.present).toBeCalledWith('test::response:');
        expect(presenter.present).toBeCalledTimes(2);
        expect(primaryInput.model).toBe('test::model:');
        expect(entireListControllerAdapter.onFormInput).toBeCalled();
    });

    it('should show current input value', function () {
        loadInteractor.loadData.mockReturnValueOnce('test::load-response:' as any);
        (presenter.present as jest.Mock).mockReturnValueOnce('test::model:');

        controller.attach(primaryInput as any);

        expect(loadInteractor.loadData).toBeCalled();
        expect(presenter.present).toBeCalledWith('test::load-response:');
        expect(primaryInput.model).toBe('test::model:');
    });

    it('should show current input value', function () {
        presenter.present.mockReturnValueOnce('test::model:');

        controller.attach(primaryInput as any);
        adapter.onDiscard();

        expect(removeInteractor.deleteOrDiscardEntry).toBeCalled();
        expect(presenter.present).toBeCalledTimes(2);
        expect(loadInteractor.loadData).toBeCalledTimes(2);
        expect(entireListControllerAdapter.onListChange).toBeCalled();
    });
});
