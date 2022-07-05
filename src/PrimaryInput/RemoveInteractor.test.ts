import RemoveInteractor from './RemoveInteractor';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../BuyingList/ListStorage/ListStorage';
import SelectionStorage from '../BuyingList/SelectionStorage/SelectionStorage';
import EntryEntity from '../ShoppingList/EntryEntity';
import FormMemory from './FormMemory/FormMemory';
import UndoStorage from '../Undo/Storage/UndoStorage';
import UndoEntity, {Actions} from '../Undo/Storage/UndoEntity';
import {SystemTabs} from '../Navigation/TabEntity';

describe(RemoveInteractor, function () {
    let interactor: RemoveInteractor,
        listStorage: ListStorage & MockProxy<ListStorage>,
        selectionStorage: SelectionStorage & MockProxy<SelectionStorage>,
        formMemory: FormMemory & MockProxy<FormMemory>,
        undoStorage: UndoStorage & MockProxy<UndoStorage>
    ;

    beforeEach(function () {
        listStorage = mock<ListStorage>();
        selectionStorage = mock<SelectionStorage>();
        formMemory = mock<FormMemory>();
        undoStorage = mock<UndoStorage>();

        interactor = new RemoveInteractor(
            listStorage,
            selectionStorage,
            formMemory,
            undoStorage
        );
    });

    it('should delete an entry', function () {
        const entry1: EntryEntity = new EntryEntity();
        entry1.id = 'test::otherId:';
        const entry2: EntryEntity = new EntryEntity();
        entry2.id = 'test::entryId:';
        entry2.name = 'test::name:';

        selectionStorage.getSelectedEntry.mockReturnValue('test::entryId:');
        listStorage.getEntireList.mockReturnValueOnce([entry1, entry2]);
        listStorage.getEntireList.mockReturnValueOnce([entry1]);
        listStorage.getShoppingList.mockReturnValueOnce([entry1, entry2, entry1]);
        listStorage.getShoppingList.mockReturnValueOnce([entry1]);

        interactor.deleteEntry();
        interactor.deleteEntry();

        expect(listStorage.saveEntireList).toBeCalledWith([entry1]);
        expect(listStorage.saveShoppingList).toBeCalledWith([entry1, entry1]);
        expect(formMemory.clearInputValue).toBeCalled();
        expect(selectionStorage.saveSelectedEntry).toBeCalledWith('');
        const expectedListUndoItem: UndoEntity = new UndoEntity();
        expectedListUndoItem.action = Actions.REMOVE_FROM_LIST;
        expectedListUndoItem.target = SystemTabs.ShoppingList;
        expectedListUndoItem.entryId = 'test::entryId:';
        expect(undoStorage.appendChange).toBeCalledWith(expectedListUndoItem);
        const expectedUndoItem: UndoEntity = new UndoEntity();
        expectedUndoItem.action = Actions.DELETE;
        expectedUndoItem.entryId = 'test::entryId:';
        expectedUndoItem.oldValue = 'test::name:';
        expect(undoStorage.appendChange).toBeCalledWith(expectedUndoItem);
        expect(undoStorage.appendChange).toBeCalledTimes(2);
    });

    it('should discard the input', function () {
        interactor.discardInput();
        interactor.discardInput();

        expect(formMemory.clearInputValue).toBeCalled();
        expect(selectionStorage.saveSelectedEntry).toBeCalledWith('');
    });
});
