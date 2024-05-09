import EntryEntity, {EntryId} from 'Core/ShoppingList/EntryEntity';
import ListStorage from 'Core/BuyingList/ListStorage';
import AddEntryToShoppingList from './AddEntryToShoppingList';

export default class AddEntryIdToShoppingList {
    constructor(
        private storage: ListStorage,
        private addEntryToShoppingList: AddEntryToShoppingList
    ) {
    }

    public addEntryIdToShoppingList(id: EntryId) {
        const list: EntryEntity[] = this.storage.getEntireList();
        const foundEntry: EntryEntity[] = list.filter((e: EntryEntity): boolean => e.id == id);
        if (foundEntry.length == 0) return;
        this.addEntryToShoppingList.addToShoppingList(foundEntry[0]);
    }
}
