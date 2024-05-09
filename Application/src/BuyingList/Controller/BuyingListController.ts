import BuyingListLoadInteractor, {Response} from 'Core/BuyingList/BuyingListLoadUseCase/BuyingListLoadInteractor';
import ListUseCase from 'Core/BuyingList/ListUseCase/ListUseCase';
import {EntryId} from 'Core/ShoppingList/EntryEntity';
import PrimaryInputAdapter from '../../PrimaryInput/PrimaryInputAdapter';
import BuyingListAdapter from '../BuyingListAdapter';
import ViewAttachedController from '../../ViewAttachedController';
import RootView from '../../RootView';
import Presenter from '../Presenter';
import NavigationAdapter from '../../Navigation/NavigationAdapter';

export default class BuyingListController implements ViewAttachedController {
    private viewInstance?: RootView;

    constructor(
        private presenter: Presenter,
        private entireListInteractor: BuyingListLoadInteractor,
        private listInteractor: ListUseCase,
        private adapter: BuyingListAdapter,
        private primaryInputAdapter: PrimaryInputAdapter,
        private navigationAdapter: NavigationAdapter
    ) {
    }

    private get view(): RootView {
        return this.viewInstance as RootView;
    }

    public async attach(view: RootView): Promise<void> {
        this.viewInstance = view;
        this.bindAdapter();
        await this.loadAndDisplayList();
    }

    private async loadAndDisplayList(): Promise<void> {
        let response: Response = this.entireListInteractor.loadActiveList();
        this.view.model = this.presenter.presentLoadResponse(response);
    }

    private bindAdapter(): void {
        this.adapter.refresh = this.loadAndDisplayList.bind(this);
        this.adapter.onFormInput = this.loadAndDisplayList.bind(this);
        this.adapter.onEntryButtonClick = this.addOrRemoveEntry.bind(this);
        this.adapter.onSelectClick = this.changeSelectedEntry.bind(this);
    }

    private async addOrRemoveEntry(id: EntryId): Promise<void> {
        this.listInteractor.addOrRemoveEntry(id);
        await this.navigationAdapter.refresh();
        await this.primaryInputAdapter.refresh();
        await this.loadAndDisplayList();
    }

    private async changeSelectedEntry(id: EntryId): Promise<void> {
        this.listInteractor.changeSelectedEntry(id);
        await this.primaryInputAdapter.refresh();
        await this.loadAndDisplayList();
    }
}
