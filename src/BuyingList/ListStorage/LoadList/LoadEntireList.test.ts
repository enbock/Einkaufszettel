import LoadEntireList from './LoadEntireList';
import ListStorage from '../ListStorage';
import {mock, MockProxy} from 'jest-mock-extended';
import EntryEntity from '../EntryEntity';
import {SystemTabs} from '../../../Navigation/TabEntity';

describe(LoadEntireList, function () {
  let task: LoadEntireList,
    listStorage: ListStorage & MockProxy<ListStorage>
  ;

  beforeEach(function () {
    listStorage = mock<ListStorage>();
    task = new LoadEntireList(listStorage);
  });

  it('should can load entire list', function () {
    listStorage.getEntireList.mockReturnValueOnce(['test::entire-list:' as any]);

    const actual: EntryEntity[] = task.loadList();

    expect(actual).toEqual(['test::entire-list:']);
  });

  it('should checks type of list', function () {
    expect(task.support(SystemTabs.EntireList)).toBeTruthy();
    expect(task.support(SystemTabs.ShoppingList)).toBeFalsy();
  });
});
