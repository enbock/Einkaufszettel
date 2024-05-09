import UpdateEntry from './UpdateEntry';
import ListStorage from 'Core/BuyingList/ListStorage';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import NavigationMemory from 'Core/Navigation/StateStorage';
import AddEntryToShoppingList from './AddEntryToShoppingList';
import {SystemTabs} from 'Core/Navigation/TabEntity';
import UndoStorage from 'Core/Undo/UndoStorage';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';

describe('UpdateEntry', function (): void {
    let task: UpdateEntry,
        storage: Mocked<ListStorage>,
        selectionStorage: Mocked<SelectionStorage>,
        formMemory: Mocked<FormMemory>,
        navigationMemory: Mocked<NavigationMemory>,
        addEntryToShoppingList: Mocked<AddEntryToShoppingList>,
        undoStorage: Mocked<UndoStorage>
    ;

    beforeEach(function (): void {
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

        storage.getEntireList.and.returnValue([currentEntry]);
        selectionStorage.getSelectedEntry.and.returnValue('test::id:');
        formMemory.readInputValue.and.returnValue('test::inputValue:');

        task.update();

        expect(currentEntry.name).toBe('test::inputValue:');
        expect(storage.saveEntireList).toHaveBeenCalledWith([currentEntry]);
        expect(formMemory.clearInputValue).toHaveBeenCalled();
        expect(selectionStorage.saveSelectedEntry).toHaveBeenCalledWith('');

        const expectedUndoItem: UndoEntity = new UndoEntity();
        expectedUndoItem.entryId = 'test::id:';
        expectedUndoItem.action = Actions.RENAME;
        expectedUndoItem.oldValue = 'test::oldName:';
        expectedUndoItem.newValue = 'test::inputValue:';
        expect(undoStorage.appendChange).toHaveBeenCalledWith(expectedUndoItem);

        return currentEntry;
    }

    it('should update the name of the selected entry and actualize shopping list', async function (): Promise<void> {
        navigationMemory.getActiveTab.and.returnValue(SystemTabs.ShoppingList);
        const currentEntry = testUpdateEntry();
        expect(addEntryToShoppingList.addToShoppingList).toHaveBeenCalledWith(currentEntry);
    });

    it('should update the name of the selected entry without shopping list actualization',
        async function (): Promise<void> {
            navigationMemory.getActiveTab.and.returnValue(SystemTabs.EntireList);
            testUpdateEntry();
            expect(addEntryToShoppingList.addToShoppingList).not.toHaveBeenCalled();
        });
});
