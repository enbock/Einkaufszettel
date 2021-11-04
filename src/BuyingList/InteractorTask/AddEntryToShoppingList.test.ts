import AddEntryToShoppingList from './AddEntryToShoppingList';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../ListStorage/ListStorage';
import EntryEntity from '../ListStorage/EntryEntity';

describe(AddEntryToShoppingList, function () {
  let task: AddEntryToShoppingList,
    storage: ListStorage & MockProxy<ListStorage>
  ;

  beforeEach(function () {
    storage = mock<ListStorage>();
    task = new AddEntryToShoppingList(storage);
  });

  it('should add entry to shopping list', function () {
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = 'test::id:';
    newEntry.name = 'test::name:';

    storage.getShoppingList.mockReturnValueOnce([]);

    task.addToShoppingList(newEntry);

    expect(storage.saveShoppingList).toBeCalledWith([newEntry]);
  });

  it('should replace entry in shopping list if exists', function () {
    const otherEntry: EntryEntity = new EntryEntity();
    otherEntry.id = 'test::id1:';
    otherEntry.name = 'test::otherName:';
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = 'test::id:';
    newEntry.name = 'test::newName:';
    const existingEntry: EntryEntity = new EntryEntity();
    existingEntry.id = 'test::id:';
    existingEntry.name = 'test::existingName:';

    storage.getShoppingList.mockReturnValueOnce([otherEntry, existingEntry]);

    task.addToShoppingList(newEntry);

    expect(storage.saveShoppingList).toBeCalledWith([otherEntry, newEntry]);
  });
});
