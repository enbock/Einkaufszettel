import NavigationInteractor, {ActivateTabRequest, LoadResponse} from '../NavigationInteractor';
import Navigation, {Adapter} from './Navigation';
import NavigationPresenter from './NavigationPresenter';
import {Adapter as BuyingListAdapter} from '../../BuyingList/View/BuyingListController';
import PrimaryInputAdapter from '../../PrimaryInput/View/PrimaryInputAdapter';

export default class NavigationController {
    private viewInstance?: Navigation;

    constructor(
        private interactor: NavigationInteractor,
        private adapter: Adapter,
        private presenter: NavigationPresenter,
        private listAdapter: BuyingListAdapter,
        private inputAdapter: PrimaryInputAdapter
    ) {
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
        this.inputAdapter.onListChange();
        this.loadAndPresentTabs();
    }

    private loadAndPresentTabs(): void {
        const response: LoadResponse = this.interactor.loadTabs();
        this.view.model = this.presenter.present(response);
    }
}
