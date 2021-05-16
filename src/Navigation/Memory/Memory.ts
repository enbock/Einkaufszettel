import {TabId} from '../TabEntity';

export default interface Memory {
  storeActiveTab(newTab: TabId): void;

  getActiveTab(): TabId;
}
