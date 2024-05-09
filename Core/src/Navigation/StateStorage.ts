import {TabId} from 'Core/Navigation/TabEntity';

export default interface StateStorage {
    storeActiveTab(newTab: TabId): void;

    getActiveTab(): TabId;
}
