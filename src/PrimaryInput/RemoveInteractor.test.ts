import RemoveInteractor from './RemoveInteractor';
import NavigationMemory from '../Memory/Memory';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../ListStorage/ListStorage';
import {SystemTabs} from '../Navigation/TabEntity';
import SelectionStorage from '../SelectionStorage/SelectionStorage';
import EntryEntity from '../ListStorage/EntryEntity';
import FormMemory from '../FormMemory/FormMemory';

describe(RemoveInteractor, function () {
  let interactor: RemoveInteractor,
    navigationMemory: NavigationMemory & MockProxy<NavigationMemory>,
    listStorage: ListStorage & MockProxy<ListStorage>,
    selectionStorage: SelectionStorage & MockProxy<SelectionStorage>,
    formMemory: FormMemory & MockProxy<FormMemory>
  ;

  beforeEach(function () {
    navigationMemory = mock<NavigationMemory>();
    listStorage = mock<ListStorage>();
    selectionStorage = mock<SelectionStorage>();
    formMemory = mock<FormMemory>();
    interactor = new RemoveInteractor(
      navigationMemory,
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

    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.EntireList);
    selectionStorage.getSelectedEntry.mockReturnValueOnce('test::entryId:');
    listStorage.getEntireList.mockReturnValueOnce([entry1, entry2]);
    listStorage.getShoppingList.mockReturnValueOnce([entry1, entry2, entry1]);

    interactor.deleteOrDiscardEntry();

    expect(listStorage.saveEntireList).toBeCalledWith([entry1]);
    expect(listStorage.saveShoppingList).toBeCalledWith([entry1, entry1]);
    expect(formMemory.clearInputValue).toBeCalled();
    expect(selectionStorage.saveSelectedEntry).toBeCalledWith('');
  });

  it('should discard the input', function () {
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);

    interactor.deleteOrDiscardEntry();

    expect(formMemory.clearInputValue).toBeCalled();
    expect(selectionStorage.saveSelectedEntry).toBeCalledWith('');
  });
});
