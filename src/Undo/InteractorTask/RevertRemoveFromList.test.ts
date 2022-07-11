import RevertRemoveFromList from './RevertRemoveFromList';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../../BuyingList/ListStorage/ListStorage';
import UndoEntity, {Actions} from '../UndoEntity';
import EntryEntity from '../../ShoppingList/EntryEntity';
import {SystemTabs} from '../../Navigation/TabEntity';

describe(RevertRemoveFromList, function () {
    let task: RevertRemoveFromList,
        storage: ListStorage & MockProxy<ListStorage>,
        undoItem: UndoEntity,
        entry: EntryEntity
    ;

    beforeEach(function () {
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
        storage.getEntireList.mockReturnValue([]);
        storage.getShoppingList.mockReturnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).not.toBeCalled();
    });

    it('should ignore undoing of existing item on shopping list', async function () {
        storage.getEntireList.mockReturnValue([entry]);
        storage.getShoppingList.mockReturnValue([entry]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).not.toBeCalled();
    });

    it('should revert removing from shopping list', async function () {
        storage.getEntireList.mockReturnValue([entry]);
        storage.getShoppingList.mockReturnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).toBeCalledWith([entry]);
    });

    it('should support undo adding to shopping list', async function () {
        expect(task.support(undoItem)).toBeTruthy();
    });
});
