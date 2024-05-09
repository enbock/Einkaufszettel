import SelectionStorage from 'Core/BuyingList/SelectionStorage';
import {EntryId} from 'Core/ShoppingList/EntryEntity';

export default class Browser implements SelectionStorage {
    constructor(
        private storage: Storage
    ) {
    }

    public getSelectedEntry(): EntryId {
        return this.storage.getItem('selected-entry') || '';
    }

    public saveSelectedEntry(selectedId: EntryId): void {
        this.storage.setItem('selected-entry', selectedId);
    }
}
