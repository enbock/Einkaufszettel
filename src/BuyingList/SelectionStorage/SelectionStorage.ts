import {EntryId} from '../../ShoppingList/EntryEntity';

export default interface SelectionStorage {
    getSelectedEntry(): EntryId;

    saveSelectedEntry(selectedId: EntryId): void;
}
