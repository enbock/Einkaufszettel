import NavigationInteractor, {ActivateTabRequest, LoadResponse} from './NavigationInteractor';
import PrimaryInputAdapter from '../PrimaryInput/PrimaryInputAdapter';
import NavigationAdapter from './NavigationAdapter';
import BuyingListAdapter from '../BuyingList/BuyingListAdapter';
import Controller from '../Controller';
import RootView from '../RootView';
import Presenter from './Presenter';

export default class NavigationController implements Controller {
    private viewInstance?: RootView;

    constructor(
        private interactor: NavigationInteractor,
        private adapter: NavigationAdapter,
        private presenter: Presenter,
        private listAdapter: BuyingListAdapter,
        private inputAdapter: PrimaryInputAdapter
    ) {
    }

    private get view(): RootView {
        return this.viewInstance as RootView;
    }

    public attach(view: RootView): void {
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
