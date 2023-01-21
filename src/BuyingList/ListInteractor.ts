import ListStorage from './ListStorage/ListStorage';
import EntryEntity, {EntryId} from '../ShoppingList/EntryEntity';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';
import NavigationMemory from '../Navigation/./StateStorage/StateStorage';
import {SystemTabs, TabId} from '../Navigation/TabEntity';
import SelectionStorage from './SelectionStorage/SelectionStorage';
import LoadListTask from './InteractorTask/LoadListTask';
import AddNewEntry from './InteractorTask/AddNewEntry';
import AddEntryIdToShoppingList from './InteractorTask/AddEntryIdToShoppingList';
import AddEntryToShoppingList from './InteractorTask/AddEntryToShoppingList';
import UpdateEntry from './InteractorTask/UpdateEntry';
import UndoEntity, {Actions} from '../Undo/UndoEntity';
import UndoStorage from '../Undo/Storage/UndoStorage';

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
        private updateEntry: UpdateEntry,
        private undoStorage: UndoStorage
    ) {
    }

    public saveEntry(): void {
        if (this.selectionStorage.getSelectedEntry() != '') this.updateEntry.update();
        else this.addNewEntry.addNewEntry();
    }

    public addOrRemoveEntry(id: EntryId): void {
        if (this.navigationMemory.getActiveTab() == SystemTabs.ShoppingList) this.removeEntryIdFromShoppingList(id);
        else this.addEntryIdToShoppingList.addEntryIdToShoppingList(id);
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

    private removeEntryIdFromShoppingList(id: EntryId): void {
        const fullList: EntryEntity[] = this.storage.getShoppingList();
        const list: EntryEntity[] = fullList.filter((e: EntryEntity): boolean => e.id != id);
        if (fullList.length == list.length) return;

        this.storage.saveShoppingList(list);

        const undoItem: UndoEntity = new UndoEntity();
        undoItem.action = Actions.REMOVE_FROM_LIST;
        undoItem.target = SystemTabs.ShoppingList;
        undoItem.entryId = id;
        this.undoStorage.appendChange(undoItem);
        this.selectionStorage.saveSelectedEntry('');
        this.formMemory.clearInputValue();
    }
}
