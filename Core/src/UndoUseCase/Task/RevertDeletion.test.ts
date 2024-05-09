import RevertDeletion from './RevertDeletion';
import ListStorage from 'Core/BuyingList/ListStorage';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

describe('RevertDeletion', function (): void {
    let task: RevertDeletion,
        storage: Mocked<ListStorage>,
        undoItem: UndoEntity
    ;

    beforeEach(function (): void {
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

        storage.getEntireList.and.returnValue([entry]);

        task.undoAction(undoItem);

        expect(storage.saveEntireList).not.toHaveBeenCalled();
    });

    it('should ignore already existing item', async function () {
        storage.getEntireList.and.returnValue([]);

        task.undoAction(undoItem);

        const expectedEntry: EntryEntity = new EntryEntity();
        expectedEntry.id = 'test::id:';
        expectedEntry.name = 'test::name:';
        expect(storage.saveEntireList).toHaveBeenCalledWith([expectedEntry]);
    });

    it('should support undo deleting item', async function () {
        expect(task.support(undoItem)).toBeTruthy();
    });
});
