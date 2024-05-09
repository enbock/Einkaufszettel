import BuyingListController from './BuyingListController';
import BuyingListLoadInteractor from 'Core/BuyingList/BuyingListLoadUseCase/BuyingListLoadInteractor';
import ListUseCase from 'Core/BuyingList/ListUseCase/ListUseCase';
import PrimaryInputAdapter from '../../PrimaryInput/PrimaryInputAdapter';
import BuyingListAdapter from '../BuyingListAdapter';
import RootView from '../../RootView';
import Presenter from '../Presenter';
import NavigationAdapter from '../../Navigation/NavigationAdapter';

describe('BuyingListController', function (): void {
    let view: Mocked<RootView>,
        controller: BuyingListController,
        presenter: Mocked<Presenter>,
        entireListInteractor: Mocked<BuyingListLoadInteractor>,
        adapter: BuyingListAdapter,
        listInteractor: Mocked<ListUseCase>,
        primaryInputAdapter: Mocked<PrimaryInputAdapter>,
        navigationAdapter: Mocked<NavigationAdapter>
    ;

    beforeEach(function (): void {
        view = mock<RootView>();
        presenter = mock<Presenter>();
        entireListInteractor = mock<BuyingListLoadInteractor>();
        adapter = mock<BuyingListAdapter>();
        listInteractor = mock<ListUseCase>();
        primaryInputAdapter = mock<PrimaryInputAdapter>();
        navigationAdapter = mock<NavigationAdapter>();

        controller = new BuyingListController(
            presenter,
            entireListInteractor,
            listInteractor,
            adapter,
            primaryInputAdapter,
            navigationAdapter
        );

        entireListInteractor.loadActiveList.and.returnValue('test::response:' as any);
        presenter.presentLoadResponse.and.returnValue('test::model:' as any);
    });

    it('should control the display of current list', async function (): Promise<void> {
        await controller.attach(view);

        expect(entireListInteractor.loadActiveList).toHaveBeenCalled();
        expect(presenter.presentLoadResponse).toHaveBeenCalledWith(<MockedObject>'test::response:');
        expect(view.model).toBe(<MockedObject>'test::model:');
    });

    it('should load list on adapter call', async function (): Promise<void> {
        await controller.attach(view);
        await adapter.refresh();

        expect(entireListInteractor.loadActiveList).toHaveBeenCalledTimes(2);
        expect(presenter.presentLoadResponse).toHaveBeenCalledTimes(2);
    });

    it('should should not load list of not attached to view', async function (): Promise<void> {
        await adapter.refresh();

        expect(entireListInteractor.loadActiveList).not.toHaveBeenCalled();
    });

    it('should add or remove entry', async function (): Promise<void> {
        await controller.attach(view);

        await adapter.onEntryButtonClick('test::id:');

        expect(listInteractor.addOrRemoveEntry).toHaveBeenCalledWith('test::id:');
        expect(navigationAdapter.refresh).toHaveBeenCalled();
    });

    it('should selected an entry', async function (): Promise<void> {
        await controller.attach(view);

        await adapter.onSelectClick('test::id:');

        expect(listInteractor.changeSelectedEntry).toHaveBeenCalledWith('test::id:');
        expect(primaryInputAdapter.refresh).toHaveBeenCalled();
    });
});
