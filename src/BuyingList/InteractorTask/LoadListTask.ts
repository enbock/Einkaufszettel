import {TabId} from '../../Navigation/TabEntity';
import EntryEntity from '../ListStorage/EntryEntity';

export default interface LoadListTask {
  support(activeTab: TabId): boolean;

  loadList(): EntryEntity[];
}
