import RevertRename from './RevertRename';
import ListStorage from '../../BuyingList/ListStorage/ListStorage';
import {mock, MockProxy} from 'jest-mock-extended';
import UndoEntity, {Actions} from '../UndoEntity';
import EntryEntity from '../../ShoppingList/EntryEntity';

describe(RevertRename, function () {
    let task: RevertRename,
        storage: ListStorage & MockProxy<ListStorage>,
        undoItem: UndoEntity,
        entry: EntryEntity
    ;

    beforeEach(function () {
        storage = mock<ListStorage>();

        task = new RevertRename(storage);

        undoItem = new UndoEntity();
        undoItem.action = Actions.RENAME;
        undoItem.entryId = 'test::id:';
        undoItem.oldValue = 'test::oldName:';

        entry = new EntryEntity();
        entry.id = 'test::id:';
        entry.name = 'test::newName:';
    });

    it('should ignore undoing of non existing item', async function () {
        storage.getEntireList.mockReturnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveEntireList).not.toBeCalled();
    });

    it('should revert item on entire list', async function () {
        storage.getEntireList.mockReturnValue([entry]);
        storage.getShoppingList.mockReturnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveEntireList).toBeCalledWith([entry]);
        expect(entry.name).toBe('test::oldName:');
    });

    it('should revert item on entire list and shopping list', async function () {
        const shoppingListEntry: EntryEntity = {...entry};

        storage.getEntireList.mockReturnValue([entry]);
        storage.getShoppingList.mockReturnValue([shoppingListEntry]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).toBeCalledWith([entry]);
        expect(entry.name).toBe('test::oldName:');
    });

    it('should support rename', async function () {
        expect(task.support(undoItem)).toBeTruthy();
    });
});
