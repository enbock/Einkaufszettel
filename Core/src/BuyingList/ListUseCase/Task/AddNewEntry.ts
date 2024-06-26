import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {SystemTabs} from 'Core/Navigation/TabEntity';
import ListStorage from 'Core/BuyingList/ListStorage';
import UniqueIdentifierGenerator from 'Core/PrimaryInput/UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import NavigationMemory from 'Core/Navigation/StateStorage';
import AddEntryToShoppingList from './AddEntryToShoppingList';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import UndoStorage from 'Core/Undo/UndoStorage';

export default class AddNewEntry {
    constructor(
        private storage: ListStorage,
        private idGenerator: UniqueIdentifierGenerator,
        private formMemory: FormMemory,
        private navigationMemory: NavigationMemory,
        private addEntryToShoppingList: AddEntryToShoppingList,
        private undoStorage: UndoStorage
    ) {
    }

    public addNewEntry() {
        const inputValue: string = this.formMemory.readInputValue().trim();
        const entireList: EntryEntity[] = this.storage.getEntireList();

        const foundExistingEntries: EntryEntity[] = entireList.filter(
            (e: EntryEntity): boolean => e.name.trim().toLowerCase() == inputValue.toLowerCase()
        );

        const entry: EntryEntity = (foundExistingEntries.length === 0)
            ? this.createAndAddNewEntry(entireList, inputValue)
            : foundExistingEntries[0]
        ;

        this.storage.saveEntireList(entireList);
        this.formMemory.clearInputValue();

        if (this.isShoppingListActive()) this.addEntryToShoppingList.addToShoppingList(entry);
    }

    private createAndAddNewEntry(entireList: EntryEntity[], inputValue: string): EntryEntity {
        let entry: EntryEntity = new EntryEntity();
        entry.id = this.idGenerator.generate();
        entry.name = inputValue;
        entireList.push(entry);

        const undoItem: UndoEntity = new UndoEntity();
        undoItem.action = Actions.CREATE;
        undoItem.entryId = entry.id;
        undoItem.newValue = entry.name;
        this.undoStorage.appendChange(undoItem);

        return entry;
    }

    private isShoppingListActive(): boolean {
        return this.navigationMemory.getActiveTab() == SystemTabs.ShoppingList;
    }
}
