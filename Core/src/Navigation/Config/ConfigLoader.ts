import TabConfig from './TabConfig.json';
import TabEntity from 'Core/Navigation/TabEntity';
import ParseHelper from 'Core/ParseHelper';

export default class ConfigLoader {
    private static parseToEntity(json: any): TabEntity {
        const entity: TabEntity = new TabEntity();
        entity.name = String(new ParseHelper().get(json, 'name', ''));
        return entity;
    }

    public loadTabsFromConfig(): TabEntity[] {
        return TabConfig.tabs.map(ConfigLoader.parseToEntity);
    }
}
