import BuyingList, {Adapter as ViewAdapter} from './BuyingList';
import BuyingListPresenter from './BuyingListPresenter';
import BuyingListLoadInteractor, {Response} from '../BuyingListLoadInteractor';
import ListInteractor from '../ListInteractor';
import {EntryId} from '../ListStorage/EntryEntity';
import PrimaryInputAdapter from '../../PrimaryInput/React/PrimaryInputAdapter';

export interface Adapter extends ViewAdapter {
  onListChange(): void;

  onFormInput(): void;
}

export default class BuyingListController {
  private viewInstance?: BuyingList;

  constructor(
    private entireListPresenter: BuyingListPresenter,
    private entireListInteractor: BuyingListLoadInteractor,
    private listInteractor: ListInteractor,
    private adapter: Adapter,
    private primaryInputAdapter: PrimaryInputAdapter
  ) {
  }

  private get view(): BuyingList {
    return this.viewInstance as BuyingList;
  }

  public attach(view: BuyingList): void {
    this.viewInstance = view;
    this.loadAndDisplayList();
    this.bindAdapter();
  }

  private loadAndDisplayList(): void {
    let response: Response = this.entireListInteractor.loadActiveList();
    this.view.model = this.entireListPresenter.presentLoadResponse(response);
  }

  private bindAdapter(): void {
    this.adapter.onListChange = this.loadAndDisplayList.bind(this);
    this.adapter.onFormInput = this.loadAndDisplayList.bind(this);
    this.adapter.onEntryButtonClick = this.addOrRemoveEntry.bind(this);
    this.adapter.onSelectClick = this.changeSelectedEntry.bind(this);
  }

  private addOrRemoveEntry(id: EntryId): void {
    this.listInteractor.addOrRemoveEntry(id);
    this.loadAndDisplayList();
  }

  private changeSelectedEntry(id: EntryId): void {
    this.listInteractor.changeSelectedEntry(id);
    this.primaryInputAdapter.onListChange();
    this.loadAndDisplayList();
  }
}
