import NavigationController from './NavigationController';
import NavigationInteractor, {ActivateTabRequest} from './NavigationInteractor';
import {mock} from 'jest-mock-extended';
import PrimaryInputAdapter from '../PrimaryInput/PrimaryInputAdapter';
import NavigationAdapter from './NavigationAdapter';
import BuyingListAdapter from '../BuyingList/BuyingListAdapter';
import RootView from '../RootView';
import Presenter from './Presenter';
import UndoInteractor from '../Undo/UndoInteractor';
import ShoppingListBus from '../ShoppingList/Controller/Bus';
import Pages from '../ShoppingList/Pages';
import Mocked = jest.Mocked;

describe(NavigationController, function () {
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

    beforeEach(function () {
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
        interactor.loadTabs.mockReturnValue('test::loadResponse:' as MockedObject);
        presenter.present.mockReturnValue('test::model:');
    });

    it('should control the switch to a new tab', function () {
        controller.attach(viewInstance);
        adapter.onNavigationClick('test::listId:');

        const expectedRequest: ActivateTabRequest = new ActivateTabRequest();
        expectedRequest.newTabId = 'test::listId:';
        expect(interactor.activateTab).toBeCalledWith(expectedRequest);
        expect(interactor.loadTabs).toBeCalledTimes(2);
        expect(presenter.present).toBeCalledWith('test::loadResponse:');
        expect(presenter.present).toBeCalledTimes(2);
        expect(viewInstance.model).toBe('test::model:');
        expect(listAdapter.refresh).toBeCalled();
        expect(inputAdapter.refresh).toBeCalled();
        expect(shoppingListBus.handlePageSwitch).toBeCalledWith(Pages.LIST);
    });

    it('should present data on external data change', async function (): Promise<void> {
        controller.attach(viewInstance);
        adapter.refresh();
        expect(presenter.present).toBeCalledTimes(2);
    });

    it('should call logic of undo data', async function (): Promise<void> {
        controller.attach(viewInstance);
        adapter.onUndoClick();

        expect(undoInteractor.undoOneAction).toBeCalled();
        expect(listAdapter.refresh).toBeCalled();
        expect(inputAdapter.refresh).toBeCalled();
        expect(presenter.present).toBeCalledTimes(2);
    });

    it('should handle page switch to setting', function (): void {
        controller.attach(viewInstance);
        adapter.onSettingClick();

        expect(shoppingListBus.handlePageSwitch).toBeCalledWith(Pages.SETTING);
    });
});
