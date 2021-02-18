import EntireList from './EntireList';
import EntireListPresenter from './EntireListPresenter';
import EntireListInteractor, {Response} from './EntireListInteractor';

export default class EntireListController {
  private externalView: EntireList | undefined;
  private readonly entireListPresenter: EntireListPresenter;
  private readonly entireListInteractor: EntireListInteractor;

  constructor(entireListPresenter: EntireListPresenter, entireListInteractor: EntireListInteractor) {
    this.entireListPresenter = entireListPresenter;
    this.entireListInteractor = entireListInteractor;
  }

  private get view(): EntireList {
    if (this.externalView === undefined) {
      throw Error('External view not given by attach().');
    }
    return this.externalView;
  }

  public attach(view: EntireList): void {
    this.externalView = view;
    this.loadAndDisplayEntireList();
  }

  private loadAndDisplayEntireList(): void {
    let response: Response = this.entireListInteractor.loadEntireList();
    this.view.model = this.entireListPresenter.presentLoadResponse(response);
  }
}
