import Memory from './Memory';
import {TabId} from '../TabEntity';

export default class SessionMemory implements Memory {
  public static storeKey: string = 'NavigationSessionMemory::activeTab';
  public static defaultData: TabId = 'entireList';
  private readonly storage: Storage;

  constructor(sessionStorage: Storage) {
    this.storage = sessionStorage;
  }

  public getActiveTab(): TabId {
    return this.storage.getItem(SessionMemory.storeKey) || SessionMemory.defaultData;
  }

  public storeActiveTab(newTab: TabId): void {
    this.storage.setItem(SessionMemory.storeKey, newTab);
  }
}
