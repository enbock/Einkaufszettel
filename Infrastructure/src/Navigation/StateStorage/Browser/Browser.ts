import StateStorage from 'Core/Navigation/StateStorage';
import {SystemTabs, TabId} from 'Core/Navigation/TabEntity';

export default class Browser implements StateStorage {
    public static storeKey: string = 'NavigationSessionMemory::activeTab';
    public static defaultData: TabId = SystemTabs.ShoppingList;
    private storage: Storage;

    constructor(sessionStorage: Storage) {
        this.storage = sessionStorage;
    }

    public storeActiveTab(newTab: TabId): void {
        this.storage.setItem(Browser.storeKey, newTab);
    }

    public getActiveTab(): TabId {
        return this.storage.getItem(Browser.storeKey) || Browser.defaultData;
    }
}
