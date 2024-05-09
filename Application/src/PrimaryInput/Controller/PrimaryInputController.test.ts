import PrimaryInputController from './PrimaryInputController';
import ListUseCase from 'Core/BuyingList/ListUseCase/ListUseCase';
import PrimaryInputAdapter from '../PrimaryInputAdapter';
import SaveInputValueInteractor, {
    Request as SaveRequest
} from 'Core/PrimaryInput/InputValueUseCase/SaveInputValueInteractor';
import LoadInteractor from 'Core/PrimaryInput/UseCase/LoadInteractor';
import RemoveInteractor from 'Core/PrimaryInput/RemoveUseCase/RemoveInteractor';
import BuyingListAdapter from '../../BuyingList/BuyingListAdapter';
import Presenter from '../Presenter';
import RootView from '../../RootView';
import NavigationAdapter from '../../Navigation/NavigationAdapter';

describe('PrimaryInputController', function (): void {
    let adapter: PrimaryInputAdapter,
        controller: PrimaryInputController,
        addEntryInteractor: Mocked<ListUseCase>,
        viewInstance: RootView,
        presenter: Mocked<Presenter>,
        saveInputValueInteractor: Mocked<SaveInputValueInteractor>,
        loadInteractor: Mocked<LoadInteractor>,
        entireListControllerAdapter: Mocked<BuyingListAdapter>,
        removeInteractor: Mocked<RemoveInteractor>,
        navigationAdapter: Mocked<NavigationAdapter>
    ;

    beforeEach(function (): void {
        adapter = new PrimaryInputAdapter();
        addEntryInteractor = mock<ListUseCase>();
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
        loadInteractor.loadData.and.returnValue(<MockedObject>'test::response:');
        presenter.present.and.returnValue(<MockedObject>'test::model:');

        controller.attach(viewInstance);
    }

    it('should create new entry on incoming submit and inform entire list about', async function (): Promise<void> {
        addEntryInteractor.saveEntry.and.returnValue();
        prepareMocksAndAttachView();

        await adapter.onSubmit();

        expect(addEntryInteractor.saveEntry).toHaveBeenCalled();
        expect(presenter.present).toHaveBeenCalledWith(<MockedObject>'test::response:');
        expect(presenter.present).toHaveBeenCalledTimes(2);
        expect(viewInstance.model).toBe('test::model:');
        expect(entireListControllerAdapter.refresh).toHaveBeenCalled();
        expect(navigationAdapter.refresh).toHaveBeenCalled();
    });

    it('should take new value of input field', async function (): Promise<void> {
        const expectedRequest: SaveRequest = new SaveRequest();
        expectedRequest.newInputValue = 'test::newValue:';

        saveInputValueInteractor.updateInputValue.and.returnValue();
        prepareMocksAndAttachView();

        await adapter.onInputChange('test::newValue:');

        expect(saveInputValueInteractor.updateInputValue).toHaveBeenCalledWith(expectedRequest);
        expect(presenter.present).toHaveBeenCalledWith(<MockedObject>'test::response:');
        expect(presenter.present).toHaveBeenCalledTimes(2);
        expect(viewInstance.model).toBe('test::model:');
        expect(entireListControllerAdapter.onFormInput).toHaveBeenCalled();
    });

    it('should show current input value', async function (): Promise<void> {
        loadInteractor.loadData.and.returnValue('test::load-response:' as any);
        presenter.present.and.returnValue('test::model:');

        controller.attach(viewInstance as any);

        expect(loadInteractor.loadData).toHaveBeenCalled();
        expect(presenter.present).toHaveBeenCalledWith(<MockedObject>'test::load-response:');
        expect(viewInstance.model).toBe('test::model:');
    });

    it('should delete current entry', async function (): Promise<void> {
        presenter.present.and.returnValue('test::model:');

        controller.attach(viewInstance as any);
        await adapter.onDelete();

        expect(removeInteractor.deleteEntry).toHaveBeenCalled();
        expect(presenter.present).toHaveBeenCalledTimes(2);
        expect(loadInteractor.loadData).toHaveBeenCalledTimes(2);
        expect(entireListControllerAdapter.refresh).toHaveBeenCalled();
        expect(navigationAdapter.refresh).toHaveBeenCalled();
    });

    it('should clear input field', async function (): Promise<void> {
        presenter.present.and.returnValue('test::model:');

        controller.attach(viewInstance as any);
        await adapter.onDiscard();

        expect(removeInteractor.discardInput).toHaveBeenCalled();
        expect(presenter.present).toHaveBeenCalledTimes(2);
        expect(loadInteractor.loadData).toHaveBeenCalledTimes(2);
        expect(entireListControllerAdapter.refresh).toHaveBeenCalled();
    });
});
