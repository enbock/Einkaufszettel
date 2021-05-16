import TabConfig from './TabConfig.json';
import TabEntity from '../TabEntity';

export default class ConfigLoader {
  public loadTabsFromConfig():TabEntity[] {
    return TabConfig.tabs.map((entity:any) => new TabEntity());
  }
}
