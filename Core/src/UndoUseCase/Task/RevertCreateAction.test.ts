import RevertCreateAction from './RevertCreateAction';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';

describe('RevertCreateAction', function (): void {
    let task: RevertCreateAction,
        listStorage: Mocked<ListStorage>,
        selectionStorage: Mocked<SelectionStorage>
    ;

    beforeEach(function (): void {
        listStorage = mock<ListStorage>();
        selectionStorage = mock<SelectionStorage>();

        task = new RevertCreateAction(
            listStorage,
            selectionStorage
        );
    });

    it('should revert creation action', async function () {
        const entry: EntryEntity = new EntryEntity();
        entry.id = 'test::id:';
        const undoItem: UndoEntity = new UndoEntity();
        undoItem.entryId = 'test::id:';

        listStorage.getEntireList.and.returnValue([entry]);
        listStorage.getShoppingList.and.returnValue([entry]);

        task.undoAction(undoItem);

        expect(listStorage.saveEntireList).toHaveBeenCalledWith([]);
        expect(listStorage.saveShoppingList).toHaveBeenCalledWith([]);
        expect(selectionStorage.saveSelectedEntry).toHaveBeenCalledWith('');
    });

    it('should support create action', async function () {
        const undoItem: UndoEntity = new UndoEntity();
        undoItem.entryId = 'test::id:';
        expect(task.support(undoItem)).toBeFalsy();

        undoItem.action = Actions.CREATE;
        expect(task.support(undoItem)).toBeTruthy();
    });
});
