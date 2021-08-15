import BuyingList, {Adapter as ViewAdapter} from './BuyingList';
import BuyingListPresenter from './BuyingListPresenter';
import BuyingListLoadInteractor, {Response} from '../BuyingListLoadInteractor';
import AddEntryInteractor from '../AddEntryInteractor';
import {EntryEntityId} from '../ListStorage/EntryEntity';

export interface Adapter extends ViewAdapter {
  onListChange(): void;

  onFormInput(): void;
}

export default class BuyingListController {
  private viewInstance?: BuyingList;

  constructor(
    private entireListPresenter: BuyingListPresenter,
    private entireListInteractor: BuyingListLoadInteractor,
    private adapter: Adapter,
    private addEntryInteractor: AddEntryInteractor
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
    this.adapter.onEntryButtonClick = this.addEntryToShoppingCart.bind(this);
  }

  private addEntryToShoppingCart(id: EntryEntityId): void {
    this.addEntryInteractor.addEntryIdToShoppingList(id);
    this.loadAndDisplayList();
  }
}
