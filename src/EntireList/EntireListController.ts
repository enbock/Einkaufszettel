import EntireList from './EntireList';
import EntireListPresenter from './EntireListPresenter';
import EntireListLoadInteractor, {Response} from './EntireListLoadInteractor';

export interface Adapter {
  onListChange(): void
}

export default class EntireListController {
  private externalView?: EntireList;
  private readonly entireListPresenter: EntireListPresenter;
  private readonly entireListInteractor: EntireListLoadInteractor;
  private readonly adapter: Adapter;

  constructor(
    entireListPresenter: EntireListPresenter,
    entireListInteractor: EntireListLoadInteractor,
    adapter: Adapter
  ) {
    this.entireListPresenter = entireListPresenter;
    this.entireListInteractor = entireListInteractor;
    this.adapter = adapter;
  }

  private get view(): EntireList {
    return this.externalView as EntireList;
  }

  public attach(view: EntireList): void {
    this.externalView = view;
    this.loadAndDisplayEntireList();
    this.bindAdapter();
  }

  private loadAndDisplayEntireList(): void {
    let response: Response = this.entireListInteractor.loadEntireList();
    this.view.model = this.entireListPresenter.presentLoadResponse(response);
  }

  private bindAdapter():void {
    this.adapter.onListChange = this.loadAndDisplayEntireList.bind(this);
  }
}
