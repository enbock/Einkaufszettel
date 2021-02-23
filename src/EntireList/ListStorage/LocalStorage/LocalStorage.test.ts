import LocalStorage from './LocalStorage';
import EntryEntity from '../EntryEntity';
import Parser from './Parser';

describe(LocalStorage, function () {
  let localStorage: LocalStorage, storage: Storage, parser: Parser;

  beforeEach(function () {
    storage = {
      getItem: jest.fn(),
      key: jest.fn(),
      length: 0,
      removeItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    parser = {
      parseEntireList: jest.fn()
    };
    localStorage = new LocalStorage(storage, parser);
  });

  it('should load the entire list', function () {
    const entity: EntryEntity = new EntryEntity();
    entity.id = 'test::id:';
    const expectedList: EntryEntity[] = [entity];

    const json:string = '{"json":"data"}';
    (storage.getItem as jest.Mock).mockReturnValueOnce(json);
    (parser.parseEntireList as jest.Mock).mockReturnValueOnce(expectedList);

    const result: EntryEntity[] = localStorage.getEntireList();

    expect(storage.getItem).toBeCalledWith('entire-list');
    expect(parser.parseEntireList).toBeCalledWith(json);
    expect(result).toBe(expectedList);
  });

  it('should load an empty entire list', function () {
    const expectedList: EntryEntity[] = [];

    (storage.getItem as jest.Mock).mockReturnValueOnce(null);

    const result: EntryEntity[] = localStorage.getEntireList();

    expect(storage.getItem).toBeCalledWith('entire-list');
    expect(parser.parseEntireList).not.toBeCalled();
    expect(result).not.toBe(expectedList);
    expect(result).toEqual(expectedList);
  });
});
