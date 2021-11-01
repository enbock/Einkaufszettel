import LocalStorage from './LocalStorage';
import EntryEntity from '../EntryEntity';
import EntryListTransformer from './EntryListTransformer';
import {mock, MockProxy} from 'jest-mock-extended';

describe(LocalStorage, function () {
  let localStorage: LocalStorage,
    storage: Storage & MockProxy<Storage>,
    transformer: EntryListTransformer & MockProxy<EntryListTransformer>
  ;

  beforeEach(function () {
    storage = mock<Storage>();
    transformer = mock<EntryListTransformer>();
    localStorage = new LocalStorage(storage, transformer);
  });

  it('should load the entire list', function () {
    const entity: EntryEntity = new EntryEntity();
    entity.id = 'test::id:';
    const expectedList: EntryEntity[] = [entity];

    const json: string = '{"json":"data"}';
    storage.getItem.mockReturnValueOnce(json);
    transformer.parseList.mockReturnValueOnce(expectedList);

    const result: EntryEntity[] = localStorage.getEntireList();

    expect(storage.getItem).toBeCalledWith('entire-list');
    expect(transformer.parseList).toBeCalledWith(json);
    expect(result).toBe(expectedList);
  });

  it('should load an empty entire list', function () {
    testEmptyList('entire-list', () => localStorage.getEntireList());
  });

  it('should save the entire list', function () {
    const entity: EntryEntity = new EntryEntity();
    entity.id = 'test::id:';
    const entireList: EntryEntity[] = [entity];
    const json: string = '{"json":"data"}';

    transformer.formatList.mockReturnValueOnce(json);
    localStorage.saveEntireList(entireList);

    expect(transformer.formatList).toBeCalledWith(entireList);
    expect(storage.setItem).toBeCalledWith('entire-list', json);
  });

  it('should load an empty shopping list', function () {
    testEmptyList('shopping-list', () => localStorage.getShoppingList());
  });

  it('should save the shopping list', function () {
    const entity: EntryEntity = new EntryEntity();
    entity.id = 'test::id:';
    const entireList: EntryEntity[] = [entity];
    const json: string = '{"json":"data"}';

    (transformer.formatList as jest.Mock).mockReturnValueOnce(json);
    localStorage.saveShoppingList(entireList);

    expect(transformer.formatList).toBeCalledWith(entireList);
    expect(storage.setItem).toBeCalledWith('shopping-list', json);
  });

  function testEmptyList(key: string, loadCallback: () => EntryEntity[]) {
    const expectedList: EntryEntity[] = [];

    (storage.getItem as jest.Mock).mockReturnValueOnce(null);

    const result: EntryEntity[] = loadCallback();

    expect(storage.getItem).toBeCalledWith(key);
    expect(transformer.parseList).not.toBeCalled();
    expect(result).not.toBe(expectedList);
    expect(result).toEqual(expectedList);
  }
});
