import NavigationController from './NavigationController';
import NavigationInteractor, {ActivateTabRequest, LoadResponse} from './NavigationInteractor';
import {mock, MockProxy} from 'jest-mock-extended';
import Navigation, {Adapter} from './Navigation';
import NavigationPresenter from './NavigationPresenter';
import NavigationModel from './NavigationModel';
import TabModel from './TabModel';

describe(NavigationController, function () {
  let controller: NavigationController,
    interactor: NavigationInteractor & MockProxy<NavigationInteractor>,
    viewInstance: Navigation & MockProxy<Navigation>,
    adapter: Adapter & MockProxy<Adapter>,
    presenter: NavigationPresenter & MockProxy<NavigationPresenter>
  ;

  beforeEach(function () {
    interactor = mock<NavigationInteractor>();
    viewInstance = mock<Navigation>();
    adapter = mock<Adapter>();
    presenter = mock<NavigationPresenter>();
    controller = new NavigationController(interactor, adapter, presenter);
  });

  it('should control the switch to a new tab', function () {
    const loadResponse:LoadResponse = new LoadResponse();
    loadResponse.activateTab = 'test::tab:';
    const model:NavigationModel = new NavigationModel();
    const tabModel:TabModel = new TabModel();
    tabModel.name = 'test::tab:'
    model.navigationTabs = [tabModel];

    interactor.loadTabs.mockReturnValueOnce(loadResponse);
    presenter.present.mockReturnValueOnce(model);
    controller.attach(viewInstance);
    adapter.onNavigationClick('test::listId:');

    const expectedRequest: ActivateTabRequest = new ActivateTabRequest();
    expectedRequest.newTabId = 'test::listId:';
    expect(interactor.activateTab).toBeCalledWith(expectedRequest);
    expect(presenter.present).toBeCalledWith(loadResponse);
    expect(viewInstance.model).toBe(model);
  });
});
