import TabEntity, {TabId} from './TabEntity';

export class ActivateTabRequest {
  public newTabId: string = '';
}

export class LoadResponse {
  public activateTab: TabId = '';
  public tabs: TabEntity[] = [];
}

export default class NavigationInteractor {
  public activateTab(request: ActivateTabRequest): void {
    console.log('TODO: App for switch to', request.newTabId);
  }

  public loadTabs(): LoadResponse {
    // TODO Loading of tabs
    const loadResponse: LoadResponse = new LoadResponse();
    const e1: TabEntity = new TabEntity();
    e1.name = 'entireList';
    const e2: TabEntity = new TabEntity();
    e2.name = 'shoppingList';
    loadResponse.tabs = [e1, e2];
    loadResponse.activateTab = 'entireList';

    return loadResponse;
  }
}
