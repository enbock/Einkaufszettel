import RevertRemoveFromList from './RevertRemoveFromList';
import ListStorage from 'Core/BuyingList/ListStorage';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {SystemTabs} from 'Core/Navigation/TabEntity';

describe('RevertRemoveFromList', function (): void {
    let task: RevertRemoveFromList,
        storage: Mocked<ListStorage>,
        undoItem: UndoEntity,
        entry: EntryEntity
    ;

    beforeEach(function (): void {
        storage = mock<ListStorage>();

        task = new RevertRemoveFromList(storage);

        undoItem = new UndoEntity();
        undoItem.action = Actions.REMOVE_FROM_LIST;
        undoItem.target = SystemTabs.ShoppingList;
        undoItem.entryId = 'test::id:';

        entry = new EntryEntity();
        entry.id = 'test::id:';
    });

    it('should ignore undoing of non existing item on entire list', async function () {
        storage.getEntireList.and.returnValue([]);
        storage.getShoppingList.and.returnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).not.toHaveBeenCalled();
    });

    it('should ignore undoing of existing item on shopping list', async function () {
        storage.getEntireList.and.returnValue([entry]);
        storage.getShoppingList.and.returnValue([entry]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).not.toHaveBeenCalled();
    });

    it('should revert removing from shopping list', async function () {
        storage.getEntireList.and.returnValue([entry]);
        storage.getShoppingList.and.returnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).toHaveBeenCalledWith([entry]);
    });

    it('should support undo adding to shopping list', async function () {
        expect(task.support(undoItem)).toBeTruthy();
    });
});
