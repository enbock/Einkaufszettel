import {TabId} from '../Navigation/TabEntity';

export default interface Memory {
  storeActiveTab(newTab: TabId): void;

  getActiveTab(): TabId;
}
