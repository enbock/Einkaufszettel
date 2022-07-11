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
import NavigationAdapter from '../Navigation/NavigationAdapter';

describe(PrimaryInputController, function () {
    let adapter: PrimaryInputAdapter,
        controller: PrimaryInputController,
        addEntryInteractor: ListInteractor & MockProxy<ListInteractor>,
        viewInstance: RootView,
        presenter: Presenter & MockProxy<Presenter>,
        saveInputValueInteractor: SaveInputValueInteractor & MockProxy<SaveInputValueInteractor>,
        loadInteractor: LoadInteractor & MockProxy<LoadInteractor>,
        entireListControllerAdapter: BuyingListAdapter & MockProxy<BuyingListAdapter>,
        removeInteractor: RemoveInteractor & MockProxy<RemoveInteractor>,
        navigationAdapter: NavigationAdapter & MockProxy<NavigationAdapter>
    ;

    beforeEach(function () {
        adapter = new PrimaryInputAdapter();
        addEntryInteractor = mock<ListInteractor>();
        saveInputValueInteractor = mock<SaveInputValueInteractor>();
        loadInteractor = mock<LoadInteractor>();
        presenter = mock<Presenter>();
        entireListControllerAdapter = mock<BuyingListAdapter>();
        removeInteractor = mock<RemoveInteractor>();
        viewInstance = mock<RootView>();
        navigationAdapter = mock<NavigationAdapter>();

        controller = new PrimaryInputController(
            adapter,
            addEntryInteractor,
            saveInputValueInteractor,
            loadInteractor,
            presenter,
            entireListControllerAdapter,
            removeInteractor,
            navigationAdapter
        );
    });

    function prepareMocksAndAttachView() {
        (loadInteractor.loadData as jest.Mock).mockReturnValue('test::response:');
        (presenter.present as jest.Mock).mockReturnValue('test::model:');

        controller.attach(viewInstance);
    }

    it('should create new entry on incoming submit and inform entire list about', function () {
        addEntryInteractor.saveEntry.mockReturnValueOnce();
        prepareMocksAndAttachView();

        adapter.onSubmit();

        expect(addEntryInteractor.saveEntry).toBeCalled();
        expect(presenter.present).toBeCalledWith('test::response:');
        expect(presenter.present).toBeCalledTimes(2);
        expect(viewInstance.model).toBe('test::model:');
        expect(entireListControllerAdapter.refresh).toBeCalled();
        expect(navigationAdapter.refresh).toBeCalled();
    });

    it('should take new value of input field', function () {
        const expectedRequest: SaveRequest = new SaveRequest();
        expectedRequest.newInputValue = 'test::newValue:';

        saveInputValueInteractor.updateInputValue.mockReturnValue();
        prepareMocksAndAttachView();

        adapter.onInputChange('test::newValue:');

        expect(saveInputValueInteractor.updateInputValue).toBeCalledWith(expectedRequest);
        expect(presenter.present).toBeCalledWith('test::response:');
        expect(presenter.present).toBeCalledTimes(2);
        expect(viewInstance.model).toBe('test::model:');
        expect(entireListControllerAdapter.onFormInput).toBeCalled();
    });

    it('should show current input value', function () {
        loadInteractor.loadData.mockReturnValueOnce('test::load-response:' as any);
        (presenter.present as jest.Mock).mockReturnValueOnce('test::model:');

        controller.attach(viewInstance as any);

        expect(loadInteractor.loadData).toBeCalled();
        expect(presenter.present).toBeCalledWith('test::load-response:');
        expect(viewInstance.model).toBe('test::model:');
    });

    it('should delete current entry', function () {
        presenter.present.mockReturnValueOnce('test::model:');

        controller.attach(viewInstance as any);
        adapter.onDelete();

        expect(removeInteractor.deleteEntry).toBeCalled();
        expect(presenter.present).toBeCalledTimes(2);
        expect(loadInteractor.loadData).toBeCalledTimes(2);
        expect(entireListControllerAdapter.refresh).toBeCalled();
        expect(navigationAdapter.refresh).toBeCalled();
    });

    it('should clear input field', function () {
        presenter.present.mockReturnValueOnce('test::model:');

        controller.attach(viewInstance as any);
        adapter.onDiscard();

        expect(removeInteractor.discardInput).toBeCalled();
        expect(presenter.present).toBeCalledTimes(2);
        expect(loadInteractor.loadData).toBeCalledTimes(2);
        expect(entireListControllerAdapter.refresh).toBeCalled();
    });
});
