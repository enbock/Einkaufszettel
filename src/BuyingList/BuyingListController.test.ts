import BuyingListController from './BuyingListController';
import BuyingListLoadInteractor from './BuyingListLoadInteractor';
import {mock, MockProxy} from 'jest-mock-extended';
import ListInteractor from './ListInteractor';
import PrimaryInputAdapter from '../PrimaryInput/PrimaryInputAdapter';
import BuyingListAdapter from './BuyingListAdapter';
import RootView from '../RootView';
import Presenter from './Presenter';

describe(BuyingListController, function () {
    let view: RootView & MockProxy<RootView>,
        controller: BuyingListController,
        presenter: Presenter & MockProxy<Presenter>,
        entireListInteractor: BuyingListLoadInteractor & MockProxy<BuyingListLoadInteractor>,
        adapter: BuyingListAdapter,
        listInteractor: ListInteractor & MockProxy<ListInteractor>,
        primaryInputAdapter: PrimaryInputAdapter & MockProxy<PrimaryInputAdapter>
    ;

    beforeEach(function () {
        view = mock<RootView>();
        presenter = mock<Presenter>();
        entireListInteractor = mock<BuyingListLoadInteractor>();
        adapter = mock<BuyingListAdapter>();
        listInteractor = mock<ListInteractor>();
        primaryInputAdapter = mock<PrimaryInputAdapter>();
        controller = new BuyingListController(
            presenter,
            entireListInteractor,
            listInteractor,
            adapter,
            primaryInputAdapter
        );

        entireListInteractor.loadActiveList.mockReturnValue('test::response:' as any);
        presenter.presentLoadResponse.mockReturnValue('test::model:' as any);
    });

    it('should control the display of current list', function () {
        controller.attach(view);

        expect(entireListInteractor.loadActiveList).toBeCalled();
        expect(presenter.presentLoadResponse).toBeCalledWith('test::response:');
        expect(view.model).toBe('test::model:');
    });

    it('should load list on adapter call', function () {
        controller.attach(view);
        adapter.onListChange();

        expect(entireListInteractor.loadActiveList).toBeCalledTimes(2);
        expect(presenter.presentLoadResponse).toBeCalledTimes(2);
    });

    it('should should not load list of not attached to view', function () {
        adapter.onListChange();

        expect(entireListInteractor.loadActiveList).not.toBeCalled();
    });

    it('should add or remove entry', function () {
        controller.attach(view);

        adapter.onEntryButtonClick('test::id:');

        expect(listInteractor.addOrRemoveEntry).toBeCalledWith('test::id:');
    });

    it('should selected an entry', function () {
        controller.attach(view);

        adapter.onSelectClick('test::id:');

        expect(listInteractor.changeSelectedEntry).toBeCalledWith('test::id:');
        expect(primaryInputAdapter.onListChange).toBeCalled();
    });
});
