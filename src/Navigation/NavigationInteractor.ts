import TabEntity, {TabId} from './TabEntity';
import StateStorage from '././StateStorage/StateStorage';
import ConfigLoader from './Config/ConfigLoader';
import UndoStorage from '../Undo/Storage/UndoStorage';

export class ActivateTabRequest {
    public newTabId: string = '';
}

export interface LoadResponse {
    activateTab: TabId;
    tabs: TabEntity[];
    hasUndoAvailable: boolean;
}

export default class NavigationInteractor {
    constructor(
        private memory: StateStorage,
        private configLoader: ConfigLoader,
        private undoStorage: UndoStorage
    ) {
    }

    public activateTab(request: ActivateTabRequest): void {
        this.memory.storeActiveTab(request.newTabId);
    }

    public loadTabs(): LoadResponse {
        return {
            activateTab: this.memory.getActiveTab(),
            hasUndoAvailable: this.undoStorage.hasItems(),
            tabs: this.configLoader.loadTabsFromConfig()
        };
    }
}
