import BuyingListLoadInteractor, {Response} from './BuyingListLoadInteractor';
import ListInteractor from './ListInteractor';
import {EntryId} from '../ShoppingList/EntryEntity';
import PrimaryInputAdapter from '../PrimaryInput/PrimaryInputAdapter';
import BuyingListAdapter from './BuyingListAdapter';
import ViewAttachedController from '../ViewAttachedController';
import RootView from '../RootView';
import Presenter from './Presenter';
import NavigationAdapter from '../Navigation/NavigationAdapter';

export default class BuyingListController implements ViewAttachedController {
    private viewInstance?: RootView;

    constructor(
        private presenter: Presenter,
        private entireListInteractor: BuyingListLoadInteractor,
        private listInteractor: ListInteractor,
        private adapter: BuyingListAdapter,
        private primaryInputAdapter: PrimaryInputAdapter,
        private navigationAdapter: NavigationAdapter
    ) {
    }

    private get view(): RootView {
        return this.viewInstance as RootView;
    }

    public attach(view: RootView): void {
        this.viewInstance = view;
        this.bindAdapter();
        this.loadAndDisplayList();
    }

    private loadAndDisplayList(): void {
        let response: Response = this.entireListInteractor.loadActiveList();
        this.view.model = this.presenter.presentLoadResponse(response);
    }

    private bindAdapter(): void {
        this.adapter.refresh = this.loadAndDisplayList.bind(this);
        this.adapter.onFormInput = this.loadAndDisplayList.bind(this);
        this.adapter.onEntryButtonClick = this.addOrRemoveEntry.bind(this);
        this.adapter.onSelectClick = this.changeSelectedEntry.bind(this);
    }

    private addOrRemoveEntry(id: EntryId): void {
        this.listInteractor.addOrRemoveEntry(id);
        this.navigationAdapter.refresh();
        this.primaryInputAdapter.refresh();
        this.loadAndDisplayList();
    }

    private changeSelectedEntry(id: EntryId): void {
        this.listInteractor.changeSelectedEntry(id);
        this.primaryInputAdapter.refresh();
        this.loadAndDisplayList();
    }
}
