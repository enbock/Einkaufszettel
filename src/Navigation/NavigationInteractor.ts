import TabEntity, {TabId} from './TabEntity';
import Memory from './Memory/Memory';
import ConfigLoader from './Config/ConfigLoader';

export class ActivateTabRequest {
  public newTabId: string = '';
}

export class LoadResponse {
  public activateTab: TabId = '';
  public tabs: TabEntity[] = [];
}

export default class NavigationInteractor {
  private readonly memory: Memory;
  private readonly configLoader: ConfigLoader;

  constructor(memory: Memory, configLoader: ConfigLoader) {
    this.configLoader = configLoader;
    this.memory = memory;
  }

  public activateTab(request: ActivateTabRequest): void {
    this.memory.storeActiveTab(request.newTabId);
  }

  public loadTabs(): LoadResponse {
    const response: LoadResponse = new LoadResponse();

    response.tabs = this.configLoader.loadTabsFromConfig();
    response.activateTab = this.memory.getActiveTab();

    return response;
  }
}
