import EntireListTransformer from './EntryListTransformer';
import EntryEntity from '../EntryEntity';

describe(EntireListTransformer, function () {
  let transformer: EntireListTransformer;

  beforeEach(function () {
    transformer = new EntireListTransformer();
  });

  it('should parse the entire list from json to entity', function () {
    const storageEntity: Object = {id: 'test::id:', name: 'test:name:'};
    const storageList: Object[] = [storageEntity];
    const json: string = JSON.stringify({list: storageList});

    const result: EntryEntity[] = transformer.parseEntireList(json);

    const expectedEntity: EntryEntity = new EntryEntity();
    expectedEntity.id = 'test::id:';
    expectedEntity.name = 'test:name:';
    const expectedList: EntryEntity[] = [expectedEntity];

    expect(result).toEqual(expectedList);
  });

  it('should handle wrong storage data', function () {
    const result: EntryEntity[] = transformer.parseEntireList('"test"');
    expect(result).toEqual([]);
  });

  it('should convert the entire list into json', function () {
    const entry: EntryEntity = new EntryEntity();
    entry.id = 'test::id:';
    entry.name = 'test::name:';
    const entireList: EntryEntity[] = [entry, entry];

    const result: string = transformer.formatEntireList(entireList);

    expect(result).toContain('"id":"test::id:"');
    expect(result).toContain('"name":"test::name:"');
    expect(result).toContain('{"list":[{');
    expect(result).toContain('},{');
    expect(result).toContain('}]}');
  });

  it('should convert wise versa', function () {
    const entry: EntryEntity = new EntryEntity();
    entry.id = 'test::id:';
    entry.name = 'test::name:';
    const entireList: EntryEntity[] = [entry];

    const json:string = transformer.formatEntireList(entireList);
    const result:EntryEntity[] = transformer.parseEntireList(json);

    expect(result).not.toBe(entireList);
    expect(result).toEqual(entireList);
  });
});
