import RemoveInteractor from './RemoveInteractor';
import ListStorage from 'Core/BuyingList/ListStorage';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import UndoStorage from 'Core/Undo/UndoStorage';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import {SystemTabs} from 'Core/Navigation/TabEntity';

describe('RemoveInteracto', function (): void {
    let interactor: RemoveInteractor,
        listStorage: Mocked<ListStorage>,
        selectionStorage: Mocked<SelectionStorage>,
        formMemory: Mocked<FormMemory>,
        undoStorage: Mocked<UndoStorage>
    ;

    beforeEach(function (): void {
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

    it('should delete an entry', async function (): Promise<void> {
        const entry1: EntryEntity = new EntryEntity();
        entry1.id = 'test::otherId:';
        const entry2: EntryEntity = new EntryEntity();
        entry2.id = 'test::entryId:';
        entry2.name = 'test::name:';

        selectionStorage.getSelectedEntry.and.returnValue('test::entryId:');
        listStorage.getEntireList.and.returnValues([entry1, entry2], [entry1]);
        listStorage.getShoppingList.and.returnValues([entry1, entry2, entry1], [entry1]);

        interactor.deleteEntry();
        interactor.deleteEntry();

        expect(listStorage.saveEntireList).toHaveBeenCalledWith([entry1]);
        expect(listStorage.saveShoppingList).toHaveBeenCalledWith([entry1, entry1]);
        expect(formMemory.clearInputValue).toHaveBeenCalled();
        expect(selectionStorage.saveSelectedEntry).toHaveBeenCalledWith('');
        const expectedListUndoItem: UndoEntity = new UndoEntity();
        expectedListUndoItem.action = Actions.REMOVE_FROM_LIST;
        expectedListUndoItem.target = SystemTabs.ShoppingList;
        expectedListUndoItem.entryId = 'test::entryId:';
        expect(undoStorage.appendChange).toHaveBeenCalledWith(expectedListUndoItem);
        const expectedUndoItem: UndoEntity = new UndoEntity();
        expectedUndoItem.action = Actions.DELETE;
        expectedUndoItem.entryId = 'test::entryId:';
        expectedUndoItem.oldValue = 'test::name:';
        expect(undoStorage.appendChange).toHaveBeenCalledWith(expectedUndoItem);
        expect(undoStorage.appendChange).toHaveBeenCalledTimes(2);
    });

    it('should discard the input', async function (): Promise<void> {
        interactor.discardInput();
        interactor.discardInput();

        expect(formMemory.clearInputValue).toHaveBeenCalled();
        expect(selectionStorage.saveSelectedEntry).toHaveBeenCalledWith('');
    });
});
