import TabEntity, {TabId} from './TabEntity';
import Memory from './Memory/Memory';
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
        private memory: Memory,
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
