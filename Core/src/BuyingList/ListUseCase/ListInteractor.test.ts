import ListUseCase from './ListUseCase';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import NavigationMemory from 'Core/Navigation/StateStorage';
import {SystemTabs} from 'Core/Navigation/TabEntity';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';
import LoadListTask from './Task/LoadListTask';
import AddNewEntry from './Task/AddNewEntry';
import AddEntryToShoppingList from './Task/AddEntryToShoppingList';
import AddEntryIdToShoppingList from './Task/AddEntryIdToShoppingList';
import UpdateEntry from './Task/UpdateEntry';
import UndoStorage from 'Core/Undo/UndoStorage';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';

describe('ListUseCase', function (): void {
    let storage: Mocked<ListStorage>,
        interactor: ListUseCase,
        formMemory: Mocked<FormMemory>,
        navigationMemory: Mocked<NavigationMemory>,
        selectionStorage: Mocked<SelectionStorage>,
        loadingTask: Mocked<LoadListTask>,
        addNewEntry: Mocked<AddNewEntry>,
        addEntryToShoppingList: Mocked<AddEntryToShoppingList>,
        addEntryIdToShoppingList: Mocked<AddEntryIdToShoppingList>,
        updateEntry: Mocked<UpdateEntry>,
        undoStorage: Mocked<UndoStorage>
    ;

    beforeEach(function (): void {
        storage = mock<ListStorage>();
        formMemory = mock<FormMemory>();
        navigationMemory = mock<NavigationMemory>();
        selectionStorage = mock<SelectionStorage>();
        loadingTask = mock<LoadListTask>();
        addNewEntry = mock<AddNewEntry>();
        addEntryToShoppingList = mock<AddEntryToShoppingList>();
        addEntryIdToShoppingList = mock<AddEntryIdToShoppingList>();
        updateEntry = mock<UpdateEntry>();
        undoStorage = mock<UndoStorage>();

        interactor = new ListUseCase(
            storage,
            formMemory,
            navigationMemory,
            selectionStorage,
            [loadingTask, loadingTask],
            addNewEntry,
            addEntryToShoppingList,
            addEntryIdToShoppingList,
            updateEntry,
            undoStorage
        );
    });

    it('should add new entry into the entire list and save in storage', async function (): Promise<void> {
        selectionStorage.getSelectedEntry.and.returnValue('');

        interactor.saveEntry();

        expect(addNewEntry.addNewEntry).toHaveBeenCalled();
    });

    it('should update entry if already exists', async function (): Promise<void> {
        selectionStorage.getSelectedEntry.and.returnValue('test::anyIdOfEntry:');

        interactor.saveEntry();

        expect(updateEntry.update).toHaveBeenCalled();
    });

    it('should add entry-id to shopping list', async function (): Promise<void> {
        navigationMemory.getActiveTab.and.returnValue(SystemTabs.EntireList);

        interactor.addOrRemoveEntry('test::id:');

        expect(addEntryIdToShoppingList.addEntryIdToShoppingList).toHaveBeenCalledWith('test::id:');
    });

    it('should remove entry-id to shopping list', async function (): Promise<void> {
        const entry1: EntryEntity = new EntryEntity();
        entry1.id = 'test::id:';
        const entry2: EntryEntity = new EntryEntity();
        entry2.id = 'test::id2:';

        navigationMemory.getActiveTab.and.returnValue(SystemTabs.ShoppingList);
        storage.getShoppingList.and.returnValues([entry1, entry2], [entry2]);

        interactor.addOrRemoveEntry('test::id:');
        interactor.addOrRemoveEntry('test::id:');

        expect(storage.saveShoppingList).toHaveBeenCalledWith([entry2]);
        const expectedUndoItem: UndoEntity = new UndoEntity();
        expectedUndoItem.action = Actions.REMOVE_FROM_LIST;
        expectedUndoItem.target = SystemTabs.ShoppingList;
        expectedUndoItem.entryId = 'test::id:';
        expect(undoStorage.appendChange).toHaveBeenCalledWith(expectedUndoItem);
        expect(undoStorage.appendChange).toHaveBeenCalledTimes(1);
        expect(selectionStorage.saveSelectedEntry).toHaveBeenCalledWith('');
        expect(formMemory.clearInputValue).toHaveBeenCalled();
    });

    it('should save the new selected entry', async function (): Promise<void> {
        const entry: EntryEntity = new EntryEntity();
        entry.id = 'test::id:';
        entry.name = 'test::inputValue:';

        navigationMemory.getActiveTab.and.returnValue('test::active:');
        loadingTask.support.and.returnValues(false, true);
        loadingTask.loadList.and.returnValue([entry]);

        interactor.changeSelectedEntry('test::id:');

        expect(selectionStorage.saveSelectedEntry).toHaveBeenCalledWith('test::id:');
        expect(formMemory.storeInputValue).toHaveBeenCalledWith('test::inputValue:');
        expect(loadingTask.support).toHaveBeenCalledWith('test::active:');
        expect(loadingTask.support).toHaveBeenCalledTimes(2);
        expect(loadingTask.loadList).toHaveBeenCalledTimes(1);
    });
});
