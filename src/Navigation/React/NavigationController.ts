import NavigationInteractor, {ActivateTabRequest, LoadResponse} from '../NavigationInteractor';
import Navigation, {Adapter} from './Navigation';
import NavigationPresenter from './NavigationPresenter';
import {Adapter as BuyingListAdapter} from '../../BuyingList/React/BuyingListController';

export default class NavigationController {
  private readonly interactor: NavigationInteractor;
  private viewInstance?: Navigation;
  private readonly adapter: Adapter;
  private listAdapter: BuyingListAdapter;
  private presenter: NavigationPresenter;

  constructor(interactor: NavigationInteractor,
              adapter: Adapter,
              presenter: NavigationPresenter,
              listAdapter: BuyingListAdapter) {
    this.listAdapter = listAdapter;
    this.presenter = presenter;
    this.adapter = adapter;
    this.interactor = interactor;
  }

  private get view(): Navigation {
    return this.viewInstance as Navigation;
  }

  public attach(view: Navigation): void {
    this.viewInstance = view;
    this.bindAdapter();
    this.loadAndPresentTabs();
  }

  private bindAdapter(): void {
    this.adapter.onNavigationClick = this.changeNavigation.bind(this);
  }

  private changeNavigation(activeList: string): void {
    const request: ActivateTabRequest = new ActivateTabRequest();
    request.newTabId = activeList;
    this.interactor.activateTab(request);
    this.listAdapter.onListChange();
    this.loadAndPresentTabs();
  }

  private loadAndPresentTabs(): void {
    const response: LoadResponse = this.interactor.loadTabs();
    this.view.model = this.presenter.present(response);
  }
}
