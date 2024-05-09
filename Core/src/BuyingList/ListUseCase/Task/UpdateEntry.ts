import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity, {EntryId} from 'Core/ShoppingList/EntryEntity';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import {SystemTabs} from 'Core/Navigation/TabEntity';
import NavigationMemory from 'Core/Navigation/StateStorage';
import AddEntryToShoppingList from './AddEntryToShoppingList';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import UndoStorage from 'Core/Undo/UndoStorage';

export default class UpdateEntry {
    constructor(
        private storage: ListStorage,
        private selectionStorage: SelectionStorage,
        private formMemory: FormMemory,
        private navigationMemory: NavigationMemory,
        private addEntryToShoppingList: AddEntryToShoppingList,
        private undoStorage: UndoStorage
    ) {
    }

    public update(): void {
        const entireList: EntryEntity[] = this.storage.getEntireList();
        const selectedEntryId: EntryId = this.selectionStorage.getSelectedEntry();
        const currentEntry: EntryEntity = entireList.find((e: EntryEntity): boolean => e.id == selectedEntryId)!;
        const newValue: string = this.formMemory.readInputValue();

        const undoItem: UndoEntity = new UndoEntity();
        undoItem.entryId = currentEntry.id;
        undoItem.action = Actions.RENAME;
        undoItem.oldValue = currentEntry.name;
        undoItem.newValue = newValue;

        currentEntry.name = newValue;

        this.storage.saveEntireList(entireList);
        this.undoStorage.appendChange(undoItem);
        this.formMemory.clearInputValue();
        this.selectionStorage.saveSelectedEntry('');

        if (this.isShoppingListActive()) this.addEntryToShoppingList.addToShoppingList(currentEntry);
    }

    private isShoppingListActive(): boolean {
        return this.navigationMemory.getActiveTab() == SystemTabs.ShoppingList;
    }
}
