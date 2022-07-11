import RevertCreateAction from './RevertCreateAction';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../../BuyingList/ListStorage/ListStorage';
import EntryEntity from '../../ShoppingList/EntryEntity';
import UndoEntity, {Actions} from '../UndoEntity';
import SelectionStorage from '../../BuyingList/SelectionStorage/SelectionStorage';

describe(RevertCreateAction, function () {
    let task: RevertCreateAction,
        listStorage: ListStorage & MockProxy<ListStorage>,
        selectionStorage: SelectionStorage & MockProxy<SelectionStorage>
    ;

    beforeEach(function () {
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

        listStorage.getEntireList.mockReturnValue([entry]);
        listStorage.getShoppingList.mockReturnValue([entry]);

        task.undoAction(undoItem);

        expect(listStorage.saveEntireList).toBeCalledWith([]);
        expect(listStorage.saveShoppingList).toBeCalledWith([]);
        expect(selectionStorage.saveSelectedEntry).toBeCalledWith('');
    });

    it('should support create action', async function () {
        const undoItem: UndoEntity = new UndoEntity();
        undoItem.entryId = 'test::id:';
        expect(task.support(undoItem)).toBeFalsy();

        undoItem.action = Actions.CREATE;
        expect(task.support(undoItem)).toBeTruthy();
    });
});
