import {TabId} from '../TabEntity';

export default interface StateStorage {
    storeActiveTab(newTab: TabId): void;

    getActiveTab(): TabId;
}
