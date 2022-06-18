import EntryEntity from '../../ShoppingList/EntryEntity';
import {SystemTabs} from '../../Navigation/TabEntity';
import ListStorage from '../ListStorage/ListStorage';
import UniqueIdentifierGenerator from '../../PrimaryInput/UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from '../../PrimaryInput/FormMemory/FormMemory';
import NavigationMemory from '../../Navigation/Memory/Memory';
import AddEntryToShoppingList from './AddEntryToShoppingList';

export default class AddNewEntry {
    constructor(
        private storage: ListStorage,
        private idGenerator: UniqueIdentifierGenerator,
        private formMemory: FormMemory,
        private navigationMemory: NavigationMemory,
        private addEntryToShoppingList: AddEntryToShoppingList
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

        return entry;
    }

    private isShoppingListActive(): boolean {
        return this.navigationMemory.getActiveTab() == SystemTabs.ShoppingList;
    }
}
