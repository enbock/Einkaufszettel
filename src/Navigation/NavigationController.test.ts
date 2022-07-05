import NavigationController from './NavigationController';
import NavigationInteractor, {ActivateTabRequest} from './NavigationInteractor';
import {mock, MockProxy} from 'jest-mock-extended';
import PrimaryInputAdapter from '../PrimaryInput/PrimaryInputAdapter';
import NavigationAdapter from './NavigationAdapter';
import BuyingListAdapter from '../BuyingList/BuyingListAdapter';
import RootView from '../RootView';
import Presenter from './Presenter';

describe(NavigationController, function () {
    let controller: NavigationController,
        interactor: NavigationInteractor & MockProxy<NavigationInteractor>,
        viewInstance: RootView & MockProxy<RootView>,
        adapter: NavigationAdapter & MockProxy<NavigationAdapter>,
        presenter: Presenter & MockProxy<Presenter>,
        listAdapter: BuyingListAdapter & MockProxy<BuyingListAdapter>,
        inputAdapter: PrimaryInputAdapter & MockProxy<PrimaryInputAdapter>
    ;

    beforeEach(function () {
        interactor = mock<NavigationInteractor>();
        viewInstance = mock<RootView>();
        adapter = mock<NavigationAdapter>();
        presenter = mock<Presenter>();
        listAdapter = mock<BuyingListAdapter>();
        inputAdapter = mock<PrimaryInputAdapter>();
        controller = new NavigationController(
            interactor,
            adapter,
            presenter,
            listAdapter,
            inputAdapter
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
        expect(listAdapter.onListChange).toBeCalled();
        expect(inputAdapter.onListChange).toBeCalled();
    });

    it('should present data on external undo data change', async function () {
        controller.attach(viewInstance);
        adapter.onUndoChange();
        expect(presenter.present).toBeCalledTimes(2);
    });
});
