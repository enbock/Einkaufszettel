import LoadEntireList from './LoadEntireList';
import ListStorage from '../ListStorage/ListStorage';
import {mock, MockProxy} from 'jest-mock-extended';
import EntryEntity from '../ListStorage/EntryEntity';
import {SystemTabs} from '../../Navigation/TabEntity';

describe(LoadEntireList, function () {
  let task: LoadEntireList,
    listStorage: ListStorage & MockProxy<ListStorage>
  ;

  beforeEach(function () {
    listStorage = mock<ListStorage>();
    task = new LoadEntireList(listStorage);
  });

  it('should can load entire list', function () {
    const entry1: EntryEntity = new EntryEntity();
    entry1.id = 'test::1:';
    const entry2: EntryEntity = new EntryEntity();
    entry2.id = 'test::2:';
    const shoppingListEntry1: EntryEntity = new EntryEntity();
    shoppingListEntry1.id = 'test::2:';
    listStorage.getEntireList.mockReturnValueOnce([entry2, entry1]);
    listStorage.getShoppingList.mockReturnValueOnce([shoppingListEntry1]);

    const actual: EntryEntity[] = task.loadList();

    expect(actual).toEqual([entry1]);
  });

  it('should checks type of list', function () {
    expect(task.support(SystemTabs.EntireList)).toBeTruthy();
    expect(task.support(SystemTabs.ShoppingList)).toBeFalsy();
  });
});
