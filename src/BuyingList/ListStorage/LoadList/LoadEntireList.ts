import LoadListTask from './LoadListTask';
import EntryEntity from '../EntryEntity';
import {SystemTabs, TabId} from '../../../Navigation/TabEntity';
import ListStorage from '../ListStorage';

export default class LoadEntireList implements LoadListTask {
  private listStorage: ListStorage;

  constructor(listStorage: ListStorage) {
    this.listStorage = listStorage;
  }

  public loadList(): EntryEntity[] {
    return this.listStorage.getEntireList();
  }

  public support(activeTab: TabId): boolean {
    return activeTab === SystemTabs.EntireList;
  }
}
