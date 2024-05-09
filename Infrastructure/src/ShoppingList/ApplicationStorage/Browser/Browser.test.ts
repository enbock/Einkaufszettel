import Browser from './Browser';
import Transformer from './Transformer';
import Pages from 'Core/ShoppingList/Pages';

describe('Browser', function (): void {
    let browser: Browser;
    let storage: Mocked<Storage>;
    let transformer: Mocked<Transformer>;

    beforeEach(function (): void {
        storage = mock<Storage>();
        transformer = mock<Transformer>();
        browser = new Browser(storage, transformer);
    });

    it('should store the active page correctly', async function (): Promise<void> {
        transformer.parse.and.returnValue({page: <Pages>'test::storedPage:'});
        transformer.encode.and.returnValue('test::encodedData:');
        browser.setActivePage(<Pages>'test::newPage:');
        expect(transformer.parse).toHaveBeenCalledWith(storage.getItem(Browser.storeKey));
        expect(transformer.encode).toHaveBeenCalledWith({page: <Pages>'test::newPage:'});
        expect(storage.setItem).toHaveBeenCalledWith(Browser.storeKey, 'test::encodedData:');
    });

    it('should get the active page correctly', async function (): Promise<void> {
        transformer.parse.and.returnValue({page: <Pages>'test::storedPage:'});
        const page: Pages = browser.getActivePage();
        expect(transformer.parse).toHaveBeenCalledWith(storage.getItem(Browser.storeKey));
        expect(page).toBe('test::storedPage:');
    });
});
