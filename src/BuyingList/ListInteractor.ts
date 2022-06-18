import ListStorage from './ListStorage/ListStorage';
import EntryEntity, {EntryId} from '../ShoppingList/EntryEntity';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';
import NavigationMemory from '../Navigation/Memory/Memory';
import {SystemTabs, TabId} from '../Navigation/TabEntity';
import SelectionStorage from './SelectionStorage/SelectionStorage';
import LoadListTask from './InteractorTask/LoadListTask';
import AddNewEntry from './InteractorTask/AddNewEntry';
import AddEntryIdToShoppingList from './InteractorTask/AddEntryIdToShoppingList';
import AddEntryToShoppingList from './InteractorTask/AddEntryToShoppingList';
import UpdateEntry from './InteractorTask/UpdateEntry';

export default class ListInteractor {
    constructor(
        private storage: ListStorage,
        private formMemory: FormMemory,
        private navigationMemory: NavigationMemory,
        private selectionStorage: SelectionStorage,
        private loadListChain: LoadListTask[],
        private addNewEntry: AddNewEntry,
        private addEntryToShoppingList: AddEntryToShoppingList,
        private addEntryIdToShoppingList: AddEntryIdToShoppingList,
        private updateEntry: UpdateEntry
    ) {
    }

    public saveEntry(): void {
        if (this.selectionStorage.getSelectedEntry() != '') this.updateEntry.update();
        else this.addNewEntry.addNewEntry();
    }

    public addToShoppingList(entry: EntryEntity): void {
        this.addEntryToShoppingList.addToShoppingList(entry);
    }

    public addOrRemoveEntry(id: EntryId): void {
        if (this.navigationMemory.getActiveTab() == SystemTabs.ShoppingList) this.removeEntryIdFromShoppingList(id);
        else this.addEntryIdToShoppingList.addEntryIdToShoppingList(id);
    }

    public removeEntryIdFromShoppingList(id: EntryId): void {
        const list: EntryEntity[] = this.storage.getShoppingList().filter((e: EntryEntity): boolean => e.id != id);
        this.storage.saveShoppingList(list);
    }

    public changeSelectedEntry(selectedId: EntryId): void {
        this.selectionStorage.saveSelectedEntry(selectedId);

        const activeTab: TabId = this.navigationMemory.getActiveTab();
        let activeList: EntryEntity[] = [];
        for (const loadTask of this.loadListChain) {
            if (loadTask.support(activeTab) === false) continue;
            activeList = loadTask.loadList();
        }

        const selectedEntry: EntryEntity = activeList.filter((e: EntryEntity): boolean => e.id == selectedId)[0];
        this.formMemory.storeInputValue(selectedEntry.name);
    }
}
