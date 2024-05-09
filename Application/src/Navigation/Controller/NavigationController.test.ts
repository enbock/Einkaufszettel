import NavigationController from './NavigationController';
import NavigationInteractor, {ActivateTabRequest} from 'Core/Navigation/UseCase/NavigationInteractor';
import PrimaryInputAdapter from '../../PrimaryInput/PrimaryInputAdapter';
import NavigationAdapter from '../NavigationAdapter';
import BuyingListAdapter from '../../BuyingList/BuyingListAdapter';
import RootView from '../../RootView';
import Presenter from '../Presenter';
import UndoInteractor from 'Core/Undo/UseCase/UndoInteractor';
import ShoppingListBus from '../../ShoppingList/Controller/Bus';
import Pages from 'Core/ShoppingList/Pages';

describe('NavigationController', function (): void {
    let controller: NavigationController,
        interactor: Mocked<NavigationInteractor>,
        viewInstance: Mocked<RootView>,
        adapter: Mocked<NavigationAdapter>,
        presenter: Mocked<Presenter>,
        listAdapter: Mocked<BuyingListAdapter>,
        inputAdapter: Mocked<PrimaryInputAdapter>,
        undoInteractor: Mocked<UndoInteractor>,
        shoppingListBus: Mocked<ShoppingListBus>
    ;

    beforeEach(function (): void {
        interactor = mock<NavigationInteractor>();
        viewInstance = mock<RootView>();
        adapter = mock<NavigationAdapter>();
        presenter = mock<Presenter>();
        listAdapter = mock<BuyingListAdapter>();
        inputAdapter = mock<PrimaryInputAdapter>();
        undoInteractor = mock<UndoInteractor>();
        shoppingListBus = mock<ShoppingListBus>();

        controller = new NavigationController(
            interactor,
            adapter,
            presenter,
            listAdapter,
            inputAdapter,
            undoInteractor,
            shoppingListBus
        );
        interactor.loadTabs.and.returnValue('test::loadResponse:' as MockedObject);
        presenter.present.and.returnValue('test::model:');
    });

    it('should control the switch to a new tab', async function (): Promise<void> {
        await controller.attach(viewInstance);
        await adapter.onNavigationClick('test::listId:');

        const expectedRequest: ActivateTabRequest = new ActivateTabRequest();
        expectedRequest.newTabId = 'test::listId:';
        expect(interactor.activateTab).toHaveBeenCalledWith(expectedRequest);
        expect(interactor.loadTabs).toHaveBeenCalledTimes(2);
        expect(presenter.present).toHaveBeenCalledWith(<MockedObject>'test::loadResponse:');
        expect(presenter.present).toHaveBeenCalledTimes(2);
        expect(viewInstance.model).toBe('test::model:');
        expect(listAdapter.refresh).toHaveBeenCalled();
        expect(inputAdapter.refresh).toHaveBeenCalled();
        expect(shoppingListBus.handlePageSwitch).toHaveBeenCalledWith(Pages.LIST);
    });

    it('should present data on external data change', async function (): Promise<void> {
        await controller.attach(viewInstance);
        await adapter.refresh();
        expect(presenter.present).toHaveBeenCalledTimes(2);
    });

    it('should call logic of undo data', async function (): Promise<void> {
        await controller.attach(viewInstance);
        await adapter.onUndoClick();

        expect(undoInteractor.undoOneAction).toHaveBeenCalled();
        expect(listAdapter.refresh).toHaveBeenCalled();
        expect(inputAdapter.refresh).toHaveBeenCalled();
        expect(presenter.present).toHaveBeenCalledTimes(2);
    });

    it('should handle page switch to setting', async function (): Promise<void> {
        await controller.attach(viewInstance);
        await adapter.onSettingClick();

        expect(shoppingListBus.handlePageSwitch).toHaveBeenCalledWith(Pages.SETTING);
    });
});
