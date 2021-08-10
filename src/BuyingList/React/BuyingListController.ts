import BuyingList from './BuyingList';
import BuyingListPresenter from './BuyingListPresenter';
import BuyingListLoadInteractor, {Response} from '../BuyingListLoadInteractor';

export interface Adapter {
  onListChange(): void
}

export default class BuyingListController {
  private externalView?: BuyingList;
  private readonly entireListPresenter: BuyingListPresenter;
  private readonly entireListInteractor: BuyingListLoadInteractor;
  private readonly adapter: Adapter;

  constructor(
    entireListPresenter: BuyingListPresenter,
    entireListInteractor: BuyingListLoadInteractor,
    adapter: Adapter
  ) {
    this.entireListPresenter = entireListPresenter;
    this.entireListInteractor = entireListInteractor;
    this.adapter = adapter;
  }

  private get view(): BuyingList {
    return this.externalView as BuyingList;
  }

  public attach(view: BuyingList): void {
    this.externalView = view;
    this.loadAndDisplayList();
    this.bindAdapter();
  }

  private loadAndDisplayList(): void {
    let response: Response = this.entireListInteractor.loadActiveList();
    this.view.model = this.entireListPresenter.presentLoadResponse(response);
  }

  private bindAdapter():void {
    this.adapter.onListChange = this.loadAndDisplayList.bind(this);
  }
}
