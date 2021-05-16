import TabConfig from './TabConfig.json';
import TabEntity from '../TabEntity';
import get from 'lodash.get';

export default class ConfigLoader {
  public loadTabsFromConfig(): TabEntity[] {
    return TabConfig.tabs.map(ConfigLoader.parseToEntity);
  }

  private static parseToEntity(json: any) {
    const entity: TabEntity = new TabEntity();
    entity.name = String(get(json, 'name', ''));
    return entity;
  }
}
