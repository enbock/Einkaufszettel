import AddEntryToShoppingList from './AddEntryToShoppingList';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import {SystemTabs} from 'Core/Navigation/TabEntity';
import UndoStorage from 'Core/Undo/UndoStorage';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';

describe('AddEntryToShoppingList', function (): void {
    let task: AddEntryToShoppingList,
        storage: Mocked<ListStorage>,
        undoStorage: Mocked<UndoStorage>,
        selectionStorage: Mocked<SelectionStorage>,
        formMemory: Mocked<FormMemory>
    ;

    beforeEach(function (): void {
        storage = mock<ListStorage>();
        undoStorage = mock<UndoStorage>();
        selectionStorage = mock<SelectionStorage>();
        formMemory = mock<FormMemory>();

        task = new AddEntryToShoppingList(
            storage,
            undoStorage,
            selectionStorage,
            formMemory
        );
    });

    it('should add entry to shopping list', async function (): Promise<void> {
        const newEntry: EntryEntity = new EntryEntity();
        newEntry.id = 'test::id:';
        newEntry.name = 'test::name:';

        storage.getShoppingList.and.returnValue([]);

        task.addToShoppingList(newEntry);

        expect(storage.saveShoppingList).toHaveBeenCalledWith([newEntry]);
        const expectedUndoItem: UndoEntity = new UndoEntity();
        expectedUndoItem.target = SystemTabs.ShoppingList;
        expectedUndoItem.action = Actions.MOVE_TO_LIST;
        expectedUndoItem.entryId = 'test::id:';
        expect(undoStorage.appendChange).toHaveBeenCalledWith(expectedUndoItem);
        expect(selectionStorage.saveSelectedEntry).toHaveBeenCalledWith('');
        expect(formMemory.clearInputValue).toHaveBeenCalled();
    });

    it('should replace entry in shopping list if exists', async function (): Promise<void> {
        const otherEntry: EntryEntity = new EntryEntity();
        otherEntry.id = 'test::id1:';
        otherEntry.name = 'test::otherName:';
        const newEntry: EntryEntity = new EntryEntity();
        newEntry.id = 'test::id:';
        newEntry.name = 'test::newName:';
        const existingEntry: EntryEntity = new EntryEntity();
        existingEntry.id = 'test::id:';
        existingEntry.name = 'test::existingName:';

        storage.getShoppingList.and.returnValue([otherEntry, existingEntry]);

        task.addToShoppingList(newEntry);

        expect(storage.saveShoppingList).toHaveBeenCalledWith([otherEntry, newEntry]);
        expect(undoStorage.appendChange).not.toHaveBeenCalled();
    });
});
