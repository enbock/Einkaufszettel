import Parser from './Parser';
import EntryEntity from '../EntryEntity';

describe(Parser, function () {
  let parser: Parser;

  beforeEach(function () {
    parser = new Parser();
  });

  it('should parse the entire list from json to entity', function () {
    const storageEntity: EntryEntity = new EntryEntity();
    storageEntity.id = 'test::id:';
    storageEntity.name = 'test:name:';
    const storageList: EntryEntity[] = [storageEntity];
    const json: string = JSON.stringify({list: storageList});

    const result: EntryEntity[] = parser.parseEntireList(json);

    const expectedEntity: EntryEntity = new EntryEntity();
    expectedEntity.id = 'test::id:';
    expectedEntity.name = 'test:name:';
    const expectedList: EntryEntity[] = [expectedEntity];

    expect(result).toEqual(expectedList);
  });

  it('should handle wrong storage data', function () {
    const result: EntryEntity[] = parser.parseEntireList('"test"');
    expect(result).toEqual([]);
  });
});
