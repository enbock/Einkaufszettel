import LocalStorage from './LocalStorage';
import EntryEntity from '../EntryEntity';
import EntryListTransformer from './EntryListTransformer';

describe(LocalStorage, function () {
  let localStorage: LocalStorage, storage: Storage, transformer: EntryListTransformer;

  beforeEach(function () {
    storage = {
      getItem: jest.fn(),
      key: jest.fn(),
      length: 0,
      removeItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    transformer = {
      formatEntireList: jest.fn(),
      parseEntireList: jest.fn()
    };
    localStorage = new LocalStorage(storage, transformer);
  });

  it('should load the entire list', function () {
    const entity: EntryEntity = new EntryEntity();
    entity.id = 'test::id:';
    const expectedList: EntryEntity[] = [entity];

    const json: string = '{"json":"data"}';
    (storage.getItem as jest.Mock).mockReturnValueOnce(json);
    (transformer.parseEntireList as jest.Mock).mockReturnValueOnce(expectedList);

    const result: EntryEntity[] = localStorage.getEntireList();

    expect(storage.getItem).toBeCalledWith('entire-list');
    expect(transformer.parseEntireList).toBeCalledWith(json);
    expect(result).toBe(expectedList);
  });

  it('should load an empty entire list', function () {
    const expectedList: EntryEntity[] = [];

    (storage.getItem as jest.Mock).mockReturnValueOnce(null);

    const result: EntryEntity[] = localStorage.getEntireList();

    expect(storage.getItem).toBeCalledWith('entire-list');
    expect(transformer.parseEntireList).not.toBeCalled();
    expect(result).not.toBe(expectedList);
    expect(result).toEqual(expectedList);
  });

  it('should save the entire list', function () {
    const entity: EntryEntity = new EntryEntity();
    entity.id = 'test::id:';
    const entireList: EntryEntity[] = [entity];
    const json: string = '{"json":"data"}';

    (transformer.formatEntireList as jest.Mock).mockReturnValueOnce(json);
    localStorage.saveEntireList(entireList);

    expect(transformer.formatEntireList).toBeCalledWith(entireList);
    expect(storage.setItem).toBeCalledWith('entire-list', json);
  });
});
