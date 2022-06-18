import UpdateEntry from './UpdateEntry';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../ListStorage/ListStorage';
import SelectionStorage from '../SelectionStorage/SelectionStorage';
import FormMemory from '../../PrimaryInput/FormMemory/FormMemory';
import EntryEntity from '../../ShoppingList/EntryEntity';
import NavigationMemory from '../../Navigation/Memory/Memory';
import AddEntryToShoppingList from './AddEntryToShoppingList';
import {SystemTabs} from '../../Navigation/TabEntity';
import UndoStorage from '../../Undo/Storage/UndoStorage';
import UndoEntity, {Actions} from '../../Undo/Storage/UndoEntity';

describe(UpdateEntry, function () {
    let task: UpdateEntry,
        storage: ListStorage & MockProxy<ListStorage>,
        selectionStorage: SelectionStorage & MockProxy<SelectionStorage>,
        formMemory: FormMemory & MockProxy<FormMemory>,
        navigationMemory: NavigationMemory & MockProxy<NavigationMemory>,
        addEntryToShoppingList: AddEntryToShoppingList & MockProxy<AddEntryToShoppingList>,
        undoStorage: UndoStorage & MockProxy<UndoStorage>
    ;

    beforeEach(function () {
        storage = mock<ListStorage>();
        selectionStorage = mock<SelectionStorage>();
        formMemory = mock<FormMemory>();
        navigationMemory = mock<NavigationMemory>();
        addEntryToShoppingList = mock<AddEntryToShoppingList>();
        undoStorage = mock<UndoStorage>();

        task = new UpdateEntry(
            storage,
            selectionStorage,
            formMemory,
            navigationMemory,
            addEntryToShoppingList,
            undoStorage
        );
    });

    function testUpdateEntry() {
        const currentEntry: EntryEntity = new EntryEntity();
        currentEntry.id = 'test::id:';
        currentEntry.name = 'test::oldName:';

        storage.getEntireList.mockReturnValueOnce([currentEntry]);
        selectionStorage.getSelectedEntry.mockReturnValueOnce('test::id:');
        formMemory.readInputValue.mockReturnValueOnce('test::inputValue:');

        task.update();

        expect(currentEntry.name).toBe('test::inputValue:');
        expect(storage.saveEntireList).toBeCalledWith([currentEntry]);
        expect(formMemory.clearInputValue).toBeCalled();
        expect(selectionStorage.saveSelectedEntry).toBeCalledWith('');

        const expectedUndoItem: UndoEntity = new UndoEntity();
        expectedUndoItem.entryId = 'test::id:';
        expectedUndoItem.action = Actions.RENAME;
        expectedUndoItem.oldValue = 'test::oldName:';
        expectedUndoItem.newValue = 'test::inputValue:';
        expect(undoStorage.appendChange).toBeCalledWith(expectedUndoItem);

        return currentEntry;
    }

    it('should update the name of the selected entry and actualize shopping list', function () {
        navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);
        const currentEntry = testUpdateEntry();
        expect(addEntryToShoppingList.addToShoppingList).toBeCalledWith(currentEntry);
    });

    it('should update the name of the selected entry without shopping list actualization', function () {
        navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.EntireList);
        testUpdateEntry();
        expect(addEntryToShoppingList.addToShoppingList).not.toBeCalled();
    });
});
