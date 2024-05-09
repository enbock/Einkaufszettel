import RevertRename from './RevertRename';
import ListStorage from 'Core/BuyingList/ListStorage';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

describe('RevertRename', function (): void {
    let task: RevertRename,
        storage: Mocked<ListStorage>,
        undoItem: UndoEntity,
        entry: EntryEntity
    ;

    beforeEach(function (): void {
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
        storage.getEntireList.and.returnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveEntireList).not.toHaveBeenCalled();
    });

    it('should revert item on entire list', async function () {
        storage.getEntireList.and.returnValue([entry]);
        storage.getShoppingList.and.returnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveEntireList).toHaveBeenCalledWith([entry]);
        expect(entry.name).toBe('test::oldName:');
    });

    it('should revert item on entire list and shopping list', async function () {
        const shoppingListEntry: EntryEntity = {...entry};

        storage.getEntireList.and.returnValue([entry]);
        storage.getShoppingList.and.returnValue([shoppingListEntry]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).toHaveBeenCalledWith([entry]);
        expect(entry.name).toBe('test::oldName:');
    });

    it('should support rename', async function () {
        expect(task.support(undoItem)).toBeTruthy();
    });
});
