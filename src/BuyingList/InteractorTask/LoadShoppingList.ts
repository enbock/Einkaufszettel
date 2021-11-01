import LoadListTask from './LoadListTask';
import EntryEntity from '../ListStorage/EntryEntity';
import {SystemTabs, TabId} from '../../Navigation/TabEntity';
import ListStorage from '../ListStorage/ListStorage';

export default class LoadShoppingList implements LoadListTask {
  private listStorage: ListStorage;

  constructor(listStorage: ListStorage) {
    this.listStorage = listStorage;
  }

  public loadList(): EntryEntity[] {
    return this.listStorage.getShoppingList();
  }

  public support(activeTab: TabId): boolean {
    return activeTab === SystemTabs.ShoppingList;
  }
}
