import Browser from './Browser';
import {SystemTabs, TabId} from 'Core/Navigation/TabEntity';

describe('Browser', function (): void {
    let memory: Browser,
        sessionStorage: Mocked<Storage>
    ;

    beforeEach(function (): void {
        sessionStorage = mock<Storage>();
        memory = new Browser(sessionStorage);
    });

    it('should can store new active tab', async function (): Promise<void> {
        memory.storeActiveTab('test::newId:');
        expect(sessionStorage.setItem).toHaveBeenCalledWith(Browser.storeKey, 'test::newId:');
    });

    it('should can load active tab', async function (): Promise<void> {
        sessionStorage.getItem.and.returnValue('test::storedId:');

        const result: TabId = memory.getActiveTab();

        expect(sessionStorage.getItem).toHaveBeenCalledWith(Browser.storeKey);
        expect(result).toBe('test::storedId:');
    });

    it('should return entireList as default if storage empty', async function (): Promise<void> {
        sessionStorage.getItem.and.returnValue(null);

        const result: TabId = memory.getActiveTab();

        expect(sessionStorage.getItem).toHaveBeenCalledWith(Browser.storeKey);
        expect(result).toBe(SystemTabs.ShoppingList);
    });
});
