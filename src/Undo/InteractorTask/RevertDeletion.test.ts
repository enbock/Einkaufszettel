import RevertDeletion from './RevertDeletion';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../../BuyingList/ListStorage/ListStorage';
import UndoEntity, {Actions} from '../UndoEntity';
import EntryEntity from '../../ShoppingList/EntryEntity';

describe(RevertDeletion, function () {
    let task: RevertDeletion,
        storage: ListStorage & MockProxy<ListStorage>,
        undoItem: UndoEntity
    ;

    beforeEach(function () {
        storage = mock<ListStorage>();

        task = new RevertDeletion(storage);

        undoItem = new UndoEntity();
        undoItem.action = Actions.DELETE;
        undoItem.entryId = 'test::id:';
        undoItem.oldValue = 'test::name:';
    });

    it('should ignore already existing item', async function () {
        const entry: EntryEntity = new EntryEntity();
        entry.id = 'test::id:';

        storage.getEntireList.mockReturnValue([entry]);

        task.undoAction(undoItem);

        expect(storage.saveEntireList).not.toBeCalled();
    });

    it('should ignore already existing item', async function () {
        storage.getEntireList.mockReturnValue([]);

        task.undoAction(undoItem);

        const expectedEntry: EntryEntity = new EntryEntity();
        expectedEntry.id = 'test::id:';
        expectedEntry.name = 'test::name:';
        expect(storage.saveEntireList).toBeCalledWith([expectedEntry]);
    });

    it('should support undo deleting item', async function () {
        expect(task.support(undoItem)).toBeTruthy();
    });
});
