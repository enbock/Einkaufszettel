import NavigationController from './NavigationController';
import NavigationInteractor, {ActivateTabRequest, LoadResponse} from './NavigationInteractor';
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
    });

    it('should control the switch to a new tab', function () {
        const loadResponse: LoadResponse = new LoadResponse();
        loadResponse.activateTab = 'test::tab:';

        interactor.loadTabs.mockReturnValue(loadResponse);
        presenter.present.mockReturnValue('test::model:');

        controller.attach(viewInstance);
        adapter.onNavigationClick('test::listId:');

        const expectedRequest: ActivateTabRequest = new ActivateTabRequest();
        expectedRequest.newTabId = 'test::listId:';
        expect(interactor.activateTab).toBeCalledWith(expectedRequest);
        expect(interactor.loadTabs).toBeCalledTimes(2);
        expect(presenter.present).toBeCalledWith(loadResponse);
        expect(presenter.present).toBeCalledTimes(2);
        expect(viewInstance.model).toBe('test::model:');
        expect(listAdapter.onListChange).toBeCalled();
        expect(inputAdapter.onListChange).toBeCalled();
    });
});
