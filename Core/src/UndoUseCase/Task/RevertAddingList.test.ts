import RevertAddingList from './RevertAddingList';
import ListStorage from 'Core/BuyingList/ListStorage';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {SystemTabs} from 'Core/Navigation/TabEntity';

describe('RevertAddingList', function (): void {
    let task: RevertAddingList,
        storage: Mocked<ListStorage>,
        undoItem: UndoEntity,
        entry: EntryEntity
    ;

    beforeEach(function (): void {
        storage = mock<ListStorage>();

        task = new RevertAddingList(storage);

        undoItem = new UndoEntity();
        undoItem.action = Actions.MOVE_TO_LIST;
        undoItem.target = SystemTabs.ShoppingList;
        undoItem.entryId = 'test::id:';

        entry = new EntryEntity();
        entry.id = 'test::id:';
    });

    it('should ignore undoing of non existing item', async function () {
        storage.getShoppingList.and.returnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).not.toHaveBeenCalled();
    });

    it('should revert adding to shopping list', async function () {

        storage.getShoppingList.and.returnValue([entry]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).toHaveBeenCalledWith([]);
    });

    it('should support undo adding to shopping list', async function () {
        expect(task.support(undoItem)).toBeTruthy();
    });
});
