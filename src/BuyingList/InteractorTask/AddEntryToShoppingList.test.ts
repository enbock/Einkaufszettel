import AddEntryToShoppingList from './AddEntryToShoppingList';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../ListStorage/ListStorage';
import EntryEntity from '../../ShoppingList/EntryEntity';
import UndoEntity, {Actions} from '../../Undo/Storage/UndoEntity';
import {SystemTabs} from '../../Navigation/TabEntity';
import UndoStorage from '../../Undo/Storage/UndoStorage';

describe(AddEntryToShoppingList, function () {
    let task: AddEntryToShoppingList,
        storage: ListStorage & MockProxy<ListStorage>,
        undoStorage: UndoStorage & MockProxy<UndoStorage>
    ;

    beforeEach(function () {
        storage = mock<ListStorage>();
        undoStorage = mock<UndoStorage>();

        task = new AddEntryToShoppingList(
            storage,
            undoStorage
        );
    });

    it('should add entry to shopping list', function () {
        const newEntry: EntryEntity = new EntryEntity();
        newEntry.id = 'test::id:';
        newEntry.name = 'test::name:';

        storage.getShoppingList.mockReturnValueOnce([]);

        task.addToShoppingList(newEntry);

        expect(storage.saveShoppingList).toBeCalledWith([newEntry]);
        const expectedUndoItem: UndoEntity = new UndoEntity();
        expectedUndoItem.target = SystemTabs.ShoppingList;
        expectedUndoItem.action = Actions.MOVE_TO_LIST;
        expectedUndoItem.entryId = 'test::id:';
        expect(undoStorage.appendChange).toBeCalledWith(expectedUndoItem);
    });

    it('should replace entry in shopping list if exists', function () {
        const otherEntry: EntryEntity = new EntryEntity();
        otherEntry.id = 'test::id1:';
        otherEntry.name = 'test::otherName:';
        const newEntry: EntryEntity = new EntryEntity();
        newEntry.id = 'test::id:';
        newEntry.name = 'test::newName:';
        const existingEntry: EntryEntity = new EntryEntity();
        existingEntry.id = 'test::id:';
        existingEntry.name = 'test::existingName:';

        storage.getShoppingList.mockReturnValueOnce([otherEntry, existingEntry]);

        task.addToShoppingList(newEntry);

        expect(storage.saveShoppingList).toBeCalledWith([otherEntry, newEntry]);
        expect(undoStorage.appendChange).not.toBeCalled();
    });
});
