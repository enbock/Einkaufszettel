import LoadShoppingList from './LoadShoppingList';
import ListStorage from '../ListStorage';
import {mock, MockProxy} from 'jest-mock-extended';
import EntryEntity from '../EntryEntity';
import {SystemTabs} from '../../../Navigation/TabEntity';

describe(LoadShoppingList, function () {
  let task: LoadShoppingList,
    listStorage: ListStorage & MockProxy<ListStorage>
  ;

  beforeEach(function () {
    listStorage = mock<ListStorage>();
    task = new LoadShoppingList(listStorage);
  });

  it('should can load shopping list', function () {
    listStorage.getShoppingList.mockReturnValueOnce(['test::shopping-list:' as any]);

    const actual: EntryEntity[] = task.loadList();

    expect(actual).toEqual(['test::shopping-list:']);
  });

  it('should checks type of list', function () {
    expect(task.support(SystemTabs.ShoppingList)).toBeTruthy();
    expect(task.support(SystemTabs.EntireList)).toBeFalsy();
  });
});
