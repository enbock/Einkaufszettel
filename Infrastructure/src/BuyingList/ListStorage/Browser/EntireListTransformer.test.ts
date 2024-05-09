import EntryListTransformer from './EntryListTransformer';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import ParseHelper from 'Core/ParseHelper';

describe('EntryListTransformer', function (): void {
    let transformer: EntryListTransformer;

    beforeEach(function (): void {
        transformer = new EntryListTransformer(
            new ParseHelper()
        );
    });

    it('should parse the list from json to entity', async function (): Promise<void> {
        const storageEntity: Object = {id: 'test::id:', name: 'test:name:'};
        const storageList: Object[] = [storageEntity];
        const json: string = JSON.stringify({list: storageList});

        const result: EntryEntity[] = transformer.parseList(json);

        const expectedEntity: EntryEntity = new EntryEntity();
        expectedEntity.id = 'test::id:';
        expectedEntity.name = 'test:name:';
        const expectedList: EntryEntity[] = [expectedEntity];

        expect(result).toEqual(expectedList);
    });

    it('should handle wrong storage data', async function (): Promise<void> {
        const result: EntryEntity[] = transformer.parseList('"test"');
        expect(result).toEqual([]);
    });

    it('should convert the entire list into json', async function (): Promise<void> {
        const entry: EntryEntity = new EntryEntity();
        entry.id = 'test::id:';
        entry.name = 'test::name:';
        const entireList: EntryEntity[] = [entry, entry];

        const result: string = transformer.formatList(entireList);

        expect(result).toContain('"id":"test::id:"');
        expect(result).toContain('"name":"test::name:"');
        expect(result).toContain('{"list":[{');
        expect(result).toContain('},{');
        expect(result).toContain('}]}');
    });

    it('should convert wise versa', async function (): Promise<void> {
        const entry: EntryEntity = new EntryEntity();
        entry.id = 'test::id:';
        entry.name = 'test::name:';
        const entireList: EntryEntity[] = [entry];

        const json: string = transformer.formatList(entireList);
        const result: EntryEntity[] = transformer.parseList(json);

        expect(result).not.toBe(entireList);
        expect(result).toEqual(entireList);
    });
});
