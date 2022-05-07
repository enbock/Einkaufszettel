import NavigationController from './NavigationController';
import NavigationInteractor, {ActivateTabRequest, LoadResponse} from '../NavigationInteractor';
import {mock, MockProxy} from 'jest-mock-extended';
import Navigation from './Navigation';
import NavigationPresenter from './NavigationPresenter';
import NavigationModel from '../NavigationModel';
import TabModel from './TabModel';
import PrimaryInputAdapter from '../../PrimaryInput/View/PrimaryInputAdapter';
import NavigationAdapter from './NavigationAdapter';
import BuyingListAdapter from '../../BuyingList/View/BuyingListAdapter';

describe(NavigationController, function () {
    let controller: NavigationController,
        interactor: NavigationInteractor & MockProxy<NavigationInteractor>,
        viewInstance: Navigation & MockProxy<Navigation>,
        adapter: NavigationAdapter & MockProxy<NavigationAdapter>,
        presenter: NavigationPresenter & MockProxy<NavigationPresenter>,
        listAdapter: BuyingListAdapter & MockProxy<BuyingListAdapter>,
        inputAdapter: PrimaryInputAdapter & MockProxy<PrimaryInputAdapter>
    ;

    beforeEach(function () {
        interactor = mock<NavigationInteractor>();
        viewInstance = mock<Navigation>();
        adapter = mock<NavigationAdapter>();
        presenter = mock<NavigationPresenter>();
        listAdapter = mock<BuyingListAdapter>();
        inputAdapter = mock<PrimaryInputAdapter>();
        controller = new NavigationController(interactor, adapter, presenter, listAdapter, inputAdapter);
    });

    it('should control the switch to a new tab', function () {
        const loadResponse: LoadResponse = new LoadResponse();
        loadResponse.activateTab = 'test::tab:';
        const model: NavigationModel = new NavigationModel();
        const tabModel: TabModel = new TabModel();
        tabModel.name = 'test::tab:';
        model.navigationTabs = [tabModel];

        interactor.loadTabs.mockReturnValue(loadResponse);
        presenter.present.mockReturnValue(model);

        controller.attach(viewInstance);
        adapter.onNavigationClick('test::listId:');

        const expectedRequest: ActivateTabRequest = new ActivateTabRequest();
        expectedRequest.newTabId = 'test::listId:';
        expect(interactor.activateTab).toBeCalledWith(expectedRequest);
        expect(interactor.loadTabs).toBeCalledTimes(2);
        expect(presenter.present).toBeCalledWith(loadResponse);
        expect(presenter.present).toBeCalledTimes(2);
        expect(viewInstance.model).toBe(model);
        expect(listAdapter.onListChange).toBeCalled();
        expect(inputAdapter.onListChange).toBeCalled();
    });
});
