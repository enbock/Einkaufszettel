import ConfigLoader from './ConfigLoader';
import TabEntity, {SystemTabs} from '../TabEntity';

describe(ConfigLoader, function () {
  let configLoader: ConfigLoader;

  beforeEach(function () {
    configLoader = new ConfigLoader();
  });

  it('should load the tab data from config', function () {
    const result: TabEntity[] = configLoader.loadTabsFromConfig();

    const entireList: TabEntity = new TabEntity();
    entireList.name = SystemTabs.EntireList;
    const shoppingList: TabEntity = new TabEntity();
    shoppingList.name = SystemTabs.ShoppingList;
    const expectedEntities: TabEntity[] = [entireList, shoppingList];

    expect(result).toEqual(expectedEntities);
  });
});
