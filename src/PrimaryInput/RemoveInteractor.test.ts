import RemoveInteractor from './RemoveInteractor';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../BuyingList/ListStorage/ListStorage';
import SelectionStorage from '../BuyingList/SelectionStorage/SelectionStorage';
import EntryEntity from '../ShoppingList/EntryEntity';
import FormMemory from './FormMemory/FormMemory';

describe(RemoveInteractor, function () {
    let interactor: RemoveInteractor,
        listStorage: ListStorage & MockProxy<ListStorage>,
        selectionStorage: SelectionStorage & MockProxy<SelectionStorage>,
        formMemory: FormMemory & MockProxy<FormMemory>
    ;

    beforeEach(function () {
        listStorage = mock<ListStorage>();
        selectionStorage = mock<SelectionStorage>();
        formMemory = mock<FormMemory>();
        interactor = new RemoveInteractor(
            listStorage,
            selectionStorage,
            formMemory
        );
    });

    it('should delete an entry', function () {
        const entry1: EntryEntity = new EntryEntity();
        entry1.id = 'test::otherId:';
        const entry2: EntryEntity = new EntryEntity();
        entry2.id = 'test::entryId:';

        selectionStorage.getSelectedEntry.mockReturnValueOnce('test::entryId:');
        listStorage.getEntireList.mockReturnValueOnce([entry1, entry2]);
        listStorage.getShoppingList.mockReturnValueOnce([entry1, entry2, entry1]);

        interactor.deleteEntry();

        expect(listStorage.saveEntireList).toBeCalledWith([entry1]);
        expect(listStorage.saveShoppingList).toBeCalledWith([entry1, entry1]);
        expect(formMemory.clearInputValue).toBeCalled();
        expect(selectionStorage.saveSelectedEntry).toBeCalledWith('');
    });

    it('should discard the input', function () {
        interactor.discardInput();

        expect(formMemory.clearInputValue).toBeCalled();
        expect(selectionStorage.saveSelectedEntry).toBeCalledWith('');
    });
});
