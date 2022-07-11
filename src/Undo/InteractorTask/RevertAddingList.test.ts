import RevertAddingList from './RevertAddingList';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../../BuyingList/ListStorage/ListStorage';
import UndoEntity, {Actions} from '../UndoEntity';
import EntryEntity from '../../ShoppingList/EntryEntity';
import {SystemTabs} from '../../Navigation/TabEntity';

describe(RevertAddingList, function () {
    let task: RevertAddingList,
        storage: ListStorage & MockProxy<ListStorage>,
        undoItem: UndoEntity,
        entry: EntryEntity
    ;

    beforeEach(function () {
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
        storage.getShoppingList.mockReturnValue([]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).not.toBeCalled();
    });

    it('should revert adding to shopping list', async function () {

        storage.getShoppingList.mockReturnValue([entry]);

        task.undoAction(undoItem);

        expect(storage.saveShoppingList).toBeCalledWith([]);
    });

    it('should support undo adding to shopping list', async function () {
        expect(task.support(undoItem)).toBeTruthy();
    });
});
