import Browser from './Browser';
import {mock} from 'jest-mock-extended';
import Transformer from './Transformer';
import Pages from '../../Pages';
import Mocked = jest.Mocked;

describe(Browser, function (): void {
    let browser: Browser;
    let storage: Mocked<Storage>;
    let transformer: Mocked<Transformer>;

    beforeEach(function () {
        storage = mock<Storage>();
        transformer = mock<Transformer>();
        browser = new Browser(storage, transformer);
    });

    it('should store the active page correctly', function (): void {
        transformer.parse.mockReturnValue({page: 'test::storedPage:' as Pages});
        transformer.encode.mockReturnValue('test::encodedData:');
        browser.setActivePage('test::newPage:' as Pages);
        expect(transformer.parse).toBeCalledWith(storage.getItem(Browser.storeKey));
        expect(transformer.encode).toBeCalledWith({page: 'test::newPage:'});
        expect(storage.setItem).toBeCalledWith(Browser.storeKey, 'test::encodedData:');
    });

    it('should get the active page correctly', function (): void {
        transformer.parse.mockReturnValue({page: 'test::storedPage:' as Pages});
        const page: Pages = browser.getActivePage();
        expect(transformer.parse).toBeCalledWith(storage.getItem(Browser.storeKey));
        expect(page).toBe('test::storedPage:');
    });
});
