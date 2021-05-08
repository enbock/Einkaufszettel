import TabModel from './TabModel';

interface I18n {
  entireListLabel: string,
  shoppingListLabel: string
}

interface TabLabelMap {
  [tabId: string]: string
}

export default class NavigationModel {
  public static i18n: I18n = {
    entireListLabel: 'Gesamtliste',
    shoppingListLabel: 'Einkaufszettel'
  };
  public static tabLabelMap: TabLabelMap = {
    'entireList': NavigationModel.i18n.entireListLabel,
    'shoppingList': NavigationModel.i18n.shoppingListLabel
  };
  public navigationTabs: TabModel[] = [];
}
