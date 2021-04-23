import TabModel from './TabModel';

interface I18n {
  entireListLabel: string,
  shoppingListLabel: string
}

export default class NavigationModel {
  public navigationTabs: TabModel[] = [];

  public static i18n: I18n = {
    entireListLabel: 'Gesamtliste',
    shoppingListLabel: 'Einkaufszettel'
  };

  constructor() {
    // TODO Presenter
    const entireListTab: TabModel = new TabModel();
    entireListTab.isActive = true;
    entireListTab.name = 'entireList';
    entireListTab.label = NavigationModel.i18n.entireListLabel;
    const shoppingListTab: TabModel = new TabModel();
    shoppingListTab.isActive = false;
    shoppingListTab.name = 'shoppingList';
    shoppingListTab.label = NavigationModel.i18n.shoppingListLabel;
    this.navigationTabs = [entireListTab, shoppingListTab];
  }
}
