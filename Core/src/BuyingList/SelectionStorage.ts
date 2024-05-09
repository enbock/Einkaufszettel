import {EntryId} from 'Core/ShoppingList/EntryEntity';

export default interface SelectionStorage {
    getSelectedEntry(): EntryId;

    saveSelectedEntry(selectedId: EntryId): void;
}
