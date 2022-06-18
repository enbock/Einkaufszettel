import ListInteractor from './ListInteractor';
import ListStorage from './ListStorage/ListStorage';
import EntryEntity from '../ShoppingList/EntryEntity';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';
import {mock, MockProxy} from 'jest-mock-extended';
import NavigationMemory from '../Navigation/Memory/Memory';
import {SystemTabs} from '../Navigation/TabEntity';
import SelectionStorage from './SelectionStorage/SelectionStorage';
import LoadListTask from './InteractorTask/LoadListTask';
import AddNewEntry from './InteractorTask/AddNewEntry';
import AddEntryToShoppingList from './InteractorTask/AddEntryToShoppingList';
import AddEntryIdToShoppingList from './InteractorTask/AddEntryIdToShoppingList';
import UpdateEntry from './InteractorTask/UpdateEntry';

describe(ListInteractor, function () {
    let storage: ListStorage & MockProxy<ListStorage>,
        interactor: ListInteractor,
        formMemory: FormMemory & MockProxy<FormMemory>,
        navigationMemory: NavigationMemory & MockProxy<NavigationMemory>,
        selectionStorage: SelectionStorage & MockProxy<SelectionStorage>,
        loadingTask: LoadListTask & MockProxy<LoadListTask>,
        addNewEntry: AddNewEntry & MockProxy<AddNewEntry>,
        addEntryToShoppingList: AddEntryToShoppingList & MockProxy<AddEntryToShoppingList>,
        addEntryIdToShoppingList: AddEntryIdToShoppingList & MockProxy<AddEntryIdToShoppingList>,
        updateEntry: UpdateEntry & MockProxy<UpdateEntry>
    ;

    beforeEach(function () {
        storage = mock<ListStorage>();
        formMemory = mock<FormMemory>();
        navigationMemory = mock<NavigationMemory>();
        selectionStorage = mock<SelectionStorage>();
        loadingTask = mock<LoadListTask>();
        addNewEntry = mock<AddNewEntry>();
        addEntryToShoppingList = mock<AddEntryToShoppingList>();
        addEntryIdToShoppingList = mock<AddEntryIdToShoppingList>();
        updateEntry = mock<UpdateEntry>();

        interactor = new ListInteractor(
            storage,
            formMemory,
            navigationMemory,
            selectionStorage,
            [loadingTask, loadingTask],
            addNewEntry,
            addEntryToShoppingList,
            addEntryIdToShoppingList,
            updateEntry
        );
    });

    it('should add new entry into the entire list and save in storage', function () {
        selectionStorage.getSelectedEntry.mockReturnValueOnce('');

        interactor.saveEntry();

        expect(addNewEntry.addNewEntry).toBeCalled();
    });

    it('should update entry if already exists', function () {
        selectionStorage.getSelectedEntry.mockReturnValueOnce('test::anyIdOfEntry:');

        interactor.saveEntry();

        expect(updateEntry.update).toBeCalled();
    });

    it('should not double add entry to shopping list', function () {
        const newEntry: EntryEntity = new EntryEntity();
        newEntry.id = 'test::id:';
        newEntry.name = 'test::name:';
        interactor.addToShoppingList(newEntry);
        expect(addEntryToShoppingList.addToShoppingList).toBeCalledWith(newEntry);
    });

    it('should add entry-id to shopping list', function () {
        navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.EntireList);

        interactor.addOrRemoveEntry('test::id:');

        expect(addEntryIdToShoppingList.addEntryIdToShoppingList).toBeCalledWith('test::id:');
    });

    it('should remove entry-id to shopping list', function () {
        const entry1: EntryEntity = new EntryEntity();
        entry1.id = 'test::id:';
        const entry2: EntryEntity = new EntryEntity();
        entry2.id = 'test::id2:';

        navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);
        storage.getShoppingList.mockReturnValueOnce([entry1, entry2]);

        interactor.addOrRemoveEntry('test::id:');

        expect(storage.saveShoppingList).toBeCalledWith([entry2]);
    });

    it('should save the new selected entry', function () {
        const entry: EntryEntity = new EntryEntity();
        entry.id = 'test::id:';
        entry.name = 'test::inputValue:';

        navigationMemory.getActiveTab.mockReturnValueOnce('test::active:');
        loadingTask.support.mockReturnValueOnce(false);
        loadingTask.support.mockReturnValueOnce(true);
        loadingTask.loadList.mockReturnValueOnce([entry]);

        interactor.changeSelectedEntry('test::id:');

        expect(selectionStorage.saveSelectedEntry).toBeCalledWith('test::id:');
        expect(formMemory.storeInputValue).toBeCalledWith('test::inputValue:');
        expect(loadingTask.support).toBeCalledWith('test::active:');
        expect(loadingTask.support).toBeCalledTimes(2);
        expect(loadingTask.loadList).toBeCalledTimes(1);
    });
});
