import NavigationInteractor, {ActivateTabRequest, LoadResponse} from 'Core/Navigation/UseCase/NavigationInteractor';
import PrimaryInputAdapter from '../../PrimaryInput/PrimaryInputAdapter';
import NavigationAdapter from '../NavigationAdapter';
import BuyingListAdapter from '../../BuyingList/BuyingListAdapter';
import ViewAttachedController from '../../ViewAttachedController';
import RootView from '../../RootView';
import Presenter from '../Presenter';
import UndoInteractor from 'Core/Undo/UseCase/UndoInteractor';
import ShoppingListBus from '../../ShoppingList/Controller/Bus';
import Pages from 'Core/ShoppingList/Pages';

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

    public async attach(view: RootView): Promise<void> {
        this.viewInstance = view;
        this.bindAdapter();
        await this.shoppingListBus.handlePageSwitch(Pages.LIST);
        await this.presentData();
    }

    private bindAdapter(): void {
        this.adapter.onNavigationClick = this.changeNavigation.bind(this);
        this.adapter.refresh = this.presentData.bind(this);
        this.adapter.onUndoClick = this.undoAction.bind(this);
        this.adapter.onSettingClick = this.changeToSetting.bind(this);
    }

    private async changeNavigation(activeList: string): Promise<void> {
        const request: ActivateTabRequest = new ActivateTabRequest();
        request.newTabId = activeList;
        this.interactor.activateTab(request);
        await this.listAdapter.refresh();
        await this.inputAdapter.refresh();
        await this.presentData();
        await this.shoppingListBus.handlePageSwitch(Pages.LIST);
    }

    private async presentData(): Promise<void> {
        const response: LoadResponse = this.interactor.loadTabs();
        this.view.model = this.presenter.present(response);
    }

    private async undoAction(): Promise<void> {
        this.undoInteractor.undoOneAction();
        await this.listAdapter.refresh();
        await this.inputAdapter.refresh();
        await this.presentData();
    }

    private async changeToSetting(): Promise<void> {
        await this.shoppingListBus.handlePageSwitch(Pages.SETTING);
    }
}
