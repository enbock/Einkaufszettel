import Browser from './Browser';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import EntryListTransformer from './EntryListTransformer';

describe('Browse', function (): void {
    let localStorage: Browser,
        storage: Mocked<Storage>,
        transformer: Mocked<EntryListTransformer>
    ;

    beforeEach(function (): void {
        storage = mock<Storage>();
        transformer = mock<EntryListTransformer>();
        localStorage = new Browser(storage, transformer);
    });

    it('should load the entire list', async function (): Promise<void> {
        const entity: EntryEntity = new EntryEntity();
        entity.id = 'test::id:';
        const expectedList: EntryEntity[] = [entity];

        const json: string = '{"json":"data"}';
        storage.getItem.and.returnValue(json);
        transformer.parseList.and.returnValue(expectedList);

        const result: EntryEntity[] = localStorage.getEntireList();

        expect(storage.getItem).toHaveBeenCalledWith('entire-list');
        expect(transformer.parseList).toHaveBeenCalledWith(json);
        expect(result).toBe(expectedList);
    });

    it('should load an empty entire list', async function (): Promise<void> {
        testEmptyList('entire-list', () => localStorage.getEntireList());
    });

    it('should save the entire list', async function (): Promise<void> {
        const entity: EntryEntity = new EntryEntity();
        entity.id = 'test::id:';
        const entireList: EntryEntity[] = [entity];
        const json: string = '{"json":"data"}';

        transformer.formatList.and.returnValue(json);
        localStorage.saveEntireList(entireList);

        expect(transformer.formatList).toHaveBeenCalledWith(entireList);
        expect(storage.setItem).toHaveBeenCalledWith('entire-list', json);
    });

    it('should load an empty shopping list', async function (): Promise<void> {
        testEmptyList('shopping-list', () => localStorage.getShoppingList());
    });

    it('should save the shopping list', async function (): Promise<void> {
        const entity: EntryEntity = new EntryEntity();
        entity.id = 'test::id:';
        const entireList: EntryEntity[] = [entity];
        const json: string = '{"json":"data"}';

        transformer.formatList.and.returnValue(json);
        localStorage.saveShoppingList(entireList);

        expect(transformer.formatList).toHaveBeenCalledWith(entireList);
        expect(storage.setItem).toHaveBeenCalledWith('shopping-list', json);
    });

    function testEmptyList(key: string, loadCallback: () => EntryEntity[]) {
        const expectedList: EntryEntity[] = [];

        storage.getItem.and.returnValue(null);

        const result: EntryEntity[] = loadCallback();

        expect(storage.getItem).toHaveBeenCalledWith(key);
        expect(transformer.parseList).not.toHaveBeenCalled();
        expect(result).not.toBe(expectedList);
        expect(result).toEqual(expectedList);
    }
});
