import ListStorage from '../ListStorage/ListStorage';
import EntryEntity, {EntryId} from '../../ShoppingList/EntryEntity';
import SelectionStorage from '../SelectionStorage/SelectionStorage';
import FormMemory from '../../PrimaryInput/FormMemory/FormMemory';
import {SystemTabs} from '../../Navigation/TabEntity';
import NavigationMemory from '../../Navigation/Memory/Memory';
import AddEntryToShoppingList from './AddEntryToShoppingList';

export default class UpdateEntry {
    constructor(
        private storage: ListStorage,
        private selectionStorage: SelectionStorage,
        private formMemory: FormMemory,
        private navigationMemory: NavigationMemory,
        private addEntryToShoppingList: AddEntryToShoppingList
    ) {
    }

    public update(): void {
        const entireList: EntryEntity[] = this.storage.getEntireList();
        const selectedEntryId: EntryId = this.selectionStorage.getSelectedEntry();
        const currentEntry: EntryEntity = entireList.filter((e: EntryEntity): boolean => e.id == selectedEntryId)[0];

        currentEntry.name = this.formMemory.readInputValue();

        this.storage.saveEntireList(entireList);
        this.formMemory.clearInputValue();
        this.selectionStorage.saveSelectedEntry('');

        if (this.isShoppingListActive()) this.addEntryToShoppingList.addToShoppingList(currentEntry);
    }

    private isShoppingListActive(): boolean {
        return this.navigationMemory.getActiveTab() == SystemTabs.ShoppingList;
    }
}
