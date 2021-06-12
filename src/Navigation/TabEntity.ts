export type TabId = string;

export enum SystemTabs {
  EntireList = 'entireList',
  ShoppingList = 'shoppingList'
}

export default class TabEntity {
  public name: TabId = '';
}
