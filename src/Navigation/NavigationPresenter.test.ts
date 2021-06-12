import NavigationPresenter from './NavigationPresenter';
import TabModel from './TabModel';
import NavigationModel from './NavigationModel';
import {LoadResponse} from './NavigationInteractor';
import TabEntity, {SystemTabs} from './TabEntity';

describe(NavigationPresenter, function () {
  let presenter: NavigationPresenter;

  beforeEach(function () {
    presenter = new NavigationPresenter();
  });

  it('should present current tab data to view', function () {
    const response: LoadResponse = new LoadResponse();
    response.activateTab = SystemTabs.EntireList;
    const entireListEntity: TabEntity = new TabEntity();
    entireListEntity.name = SystemTabs.EntireList;
    const shoppingListEntity: TabEntity = new TabEntity();
    shoppingListEntity.name = SystemTabs.ShoppingList;
    response.tabs = [entireListEntity, shoppingListEntity];

    const result: NavigationModel = presenter.present(response);

    const expectedModel: NavigationModel = new NavigationModel();
    const entireListTab: TabModel = new TabModel();
    entireListTab.isActive = true;
    entireListTab.name = SystemTabs.EntireList;
    entireListTab.label = NavigationModel.i18n.entireListLabel;
    const shoppingListTab: TabModel = new TabModel();
    shoppingListTab.isActive = false;
    shoppingListTab.name = SystemTabs.ShoppingList;
    shoppingListTab.label = NavigationModel.i18n.shoppingListLabel;
    expectedModel.navigationTabs = [entireListTab, shoppingListTab];

    expect(result).toEqual(expectedModel);
  });
});
