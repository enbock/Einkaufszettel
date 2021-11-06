import LoadListTask from './LoadListTask';
import EntryEntity from '../../ListStorage/EntryEntity';
import {SystemTabs, TabId} from '../../Navigation/TabEntity';
import ListStorage from '../../ListStorage/ListStorage';

export default class LoadEntireList implements LoadListTask {
  private listStorage: ListStorage;

  constructor(listStorage: ListStorage) {
    this.listStorage = listStorage;
  }

  public loadList(): EntryEntity[] {
    const shoppingList: EntryEntity[] = this.listStorage.getShoppingList();
    return this.listStorage.getEntireList().filter(
      (entry: EntryEntity): boolean => shoppingList.filter((s: EntryEntity) => s.id === entry.id).length === 0
    );
  }

  public support(activeTab: TabId): boolean {
    return activeTab === SystemTabs.EntireList;
  }
}
