import NavigationInteractor, {ActivateTabRequest, LoadResponse} from './NavigationInteractor';
import Navigation, {Adapter} from './Navigation';
import NavigationPresenter from './NavigationPresenter';

export default class NavigationController {
  private readonly interactor: NavigationInteractor;
  private viewInstance?: Navigation;
  private readonly adapter: Adapter;
  private presenter: NavigationPresenter;

  constructor(interactor: NavigationInteractor, adapter: Adapter, presenter: NavigationPresenter) {
    this.presenter = presenter;
    this.adapter = adapter;
    this.interactor = interactor;
  }

  public attach(view: Navigation): void {
    this.viewInstance = view;
    this.bindAdapter();
    this.loadAndPresentTabs();
  }

  private get view(): Navigation {
    return this.viewInstance as Navigation;
  }

  private bindAdapter(): void {
    this.adapter.onNavigationClick = this.changeNavigation.bind(this);
  }

  private changeNavigation(activeList: string): void {
    const request: ActivateTabRequest = new ActivateTabRequest();
    request.newTabId = activeList;
    this.interactor.activateTab(request);
    this.loadAndPresentTabs();
  }

  private loadAndPresentTabs(): void {
    const response: LoadResponse = this.interactor.loadTabs();
    this.view.model = this.presenter.present(response);
  }
}
