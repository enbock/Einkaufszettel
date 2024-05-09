import ConfigLoader from './ConfigLoader';
import TabEntity, {SystemTabs} from 'Core/Navigation/TabEntity';

describe('ConfigLoade', function (): void {
    let configLoader: ConfigLoader;

    beforeEach(function (): void {
        configLoader = new ConfigLoader();
    });

    it('should load the tab data from config', async function (): Promise<void> {
        const result: TabEntity[] = configLoader.loadTabsFromConfig();

        const entireList: TabEntity = new TabEntity();
        entireList.name = SystemTabs.EntireList;
        const shoppingList: TabEntity = new TabEntity();
        shoppingList.name = SystemTabs.ShoppingList;
        const expectedEntities: TabEntity[] = [entireList, shoppingList];

        expect(result).toEqual(expectedEntities);
    });
});
