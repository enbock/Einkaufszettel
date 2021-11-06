import AddEntryIdToShoppingList from './AddEntryIdToShoppingList';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../../ListStorage/ListStorage';
import AddEntryToShoppingList from './AddEntryToShoppingList';
import EntryEntity from '../../ListStorage/EntryEntity';

describe(AddEntryIdToShoppingList, function () {
  let task: AddEntryIdToShoppingList,
    storage: ListStorage & MockProxy<ListStorage>,
    addEntryToShoppingList: AddEntryToShoppingList & MockProxy<AddEntryToShoppingList>
  ;

  beforeEach(function () {
    storage = mock<ListStorage>();
    addEntryToShoppingList = mock<AddEntryToShoppingList>();
    task = new AddEntryIdToShoppingList(storage, addEntryToShoppingList);
  });

  it('should add an entry by id to the shopping list', function () {
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = 'test::id:';
    newEntry.name = 'test::name:';

    storage.getEntireList.mockReturnValueOnce([newEntry]);

    task.addEntryIdToShoppingList('test::id:');

    expect(addEntryToShoppingList.addToShoppingList).toBeCalledWith(newEntry);
  });

  it('should not add an entry by unknown ids', function () {

    storage.getEntireList.mockReturnValueOnce([]);

    task.addEntryIdToShoppingList('test::id:');

    expect(addEntryToShoppingList.addToShoppingList).not.toBeCalled();
  });
});
