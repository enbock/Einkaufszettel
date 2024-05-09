import LoadListTask from './LoadListTask';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {SystemTabs, TabId} from 'Core/Navigation/TabEntity';
import ListStorage from 'Core/BuyingList/ListStorage';

export default class LoadShoppingList implements LoadListTask {
    private listStorage: ListStorage;

    constructor(listStorage: ListStorage) {
        this.listStorage = listStorage;
    }

    public support(activeTab: TabId): boolean {
        return activeTab === SystemTabs.ShoppingList;
    }

    public loadList(): EntryEntity[] {
        return this.listStorage.getShoppingList();
    }
}
