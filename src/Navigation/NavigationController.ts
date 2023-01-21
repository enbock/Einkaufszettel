import NavigationInteractor, {ActivateTabRequest, LoadResponse} from './NavigationInteractor';
import PrimaryInputAdapter from '../PrimaryInput/PrimaryInputAdapter';
import NavigationAdapter from './NavigationAdapter';
import BuyingListAdapter from '../BuyingList/BuyingListAdapter';
import ViewAttachedController from '../ViewAttachedController';
import RootView from '../RootView';
import Presenter from './Presenter';
import UndoInteractor from '../Undo/UndoInteractor';
import ShoppingListBus from '../ShoppingList/Controller/Bus';
import Pages from '../ShoppingList/Pages';

export default class NavigationController implements ViewAttachedController {
    private viewInstance?: RootView;

    constructor(
        private interactor: NavigationInteractor,
        private adapter: NavigationAdapter,
        private presenter: Presenter,
        private listAdapter: BuyingListAdapter,
        private inputAdapter: PrimaryInputAdapter,
        private undoInteractor: UndoInteractor,
        private shoppingListBus: ShoppingListBus
    ) {
    }

    private get view(): RootView {
        return this.viewInstance as RootView;
    }

    public attach(view: RootView): void {
        this.viewInstance = view;
        this.bindAdapter();
        this.shoppingListBus.handlePageSwitch(Pages.LIST);
        this.presentData();
    }

    private bindAdapter(): void {
        this.adapter.onNavigationClick = this.changeNavigation.bind(this);
        this.adapter.refresh = this.presentData.bind(this);
        this.adapter.onUndoClick = this.undoAction.bind(this);
        this.adapter.onSettingClick = this.changeToSetting.bind(this);
    }

    private changeNavigation(activeList: string): void {
        const request: ActivateTabRequest = new ActivateTabRequest();
        request.newTabId = activeList;
        this.interactor.activateTab(request);
        this.listAdapter.refresh();
        this.inputAdapter.refresh();
        this.presentData();
        this.shoppingListBus.handlePageSwitch(Pages.LIST);
    }

    private presentData(): void {
        const response: LoadResponse = this.interactor.loadTabs();
        this.view.model = this.presenter.present(response);
    }

    private undoAction(): void {
        this.undoInteractor.undoOneAction();
        this.listAdapter.refresh();
        this.inputAdapter.refresh();
        this.presentData();
    }

    private changeToSetting(): void {
        this.shoppingListBus.handlePageSwitch(Pages.SETTING);
    }
}
