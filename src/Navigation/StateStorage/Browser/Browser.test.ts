import Browser from './Browser';
import {mock} from 'jest-mock-extended';
import {SystemTabs, TabId} from '../../TabEntity';
import Mocked = jest.Mocked;

describe(Browser, function (): void {
    let memory: Browser,
        sessionStorage: Mocked<Storage>
    ;

    beforeEach(function (): void {
        sessionStorage = mock<Storage>();
        memory = new Browser(sessionStorage);
    });

    it('should can store new active tab', function (): void {
        memory.storeActiveTab('test::newId:');
        expect(sessionStorage.setItem).toBeCalledWith(Browser.storeKey, 'test::newId:');
    });

    it('should can load active tab', function (): void {
        sessionStorage.getItem.mockReturnValueOnce('test::storedId:');

        const result: TabId = memory.getActiveTab();

        expect(sessionStorage.getItem).toBeCalledWith(Browser.storeKey);
        expect(result).toBe('test::storedId:');
    });

    it('should return entireList as default if storage empty', function (): void {
        sessionStorage.getItem.mockReturnValueOnce(null);

        const result: TabId = memory.getActiveTab();

        expect(sessionStorage.getItem).toBeCalledWith(Browser.storeKey);
        expect(result).toBe(SystemTabs.ShoppingList);
    });
});
