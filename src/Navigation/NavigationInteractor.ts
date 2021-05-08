export class ActivateTabRequest {
  public newTabId: string = '';
}

export class LoadResponse {
  public activateTab: string = '';
}

export default class NavigationInteractor {
  public activateTab(request: ActivateTabRequest): void {
    console.log('TODO: App for switch to', request.newTabId);
  }

  public loadTabs(): LoadResponse {
    return new LoadResponse();
  }
}
