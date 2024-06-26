import LoadListTask from './LoadListTask';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {SystemTabs, TabId} from 'Core/Navigation/TabEntity';
import ListStorage from 'Core/BuyingList/ListStorage';

export default class LoadEntireList implements LoadListTask {
    private listStorage: ListStorage;

    constructor(listStorage: ListStorage) {
        this.listStorage = listStorage;
    }

    public support(activeTab: TabId): boolean {
        return activeTab === SystemTabs.EntireList;
    }

    public loadList(): EntryEntity[] {
        const shoppingList: EntryEntity[] = this.listStorage.getShoppingList();
        return this.listStorage.getEntireList().filter(
            (entry: EntryEntity): boolean => shoppingList.filter(
                (s: EntryEntity): boolean => s.id === entry.id
            ).length === 0
        );
    }
}
