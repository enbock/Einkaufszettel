import LoadListTask from './LoadListTask';
import EntryEntity from '../../ShoppingList/EntryEntity';
import {SystemTabs, TabId} from '../../Navigation/TabEntity';
import ListStorage from '../ListStorage/ListStorage';

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
