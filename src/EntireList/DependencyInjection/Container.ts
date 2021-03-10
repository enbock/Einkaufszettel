import EntireListAdapter from '../EntireListAdapter';
import EntireListController from '../EntireListController';
import EntireListInteractor from '../EntireListInteractor';
import EntireListPresenter from '../EntireListPresenter';
import GlobalContainer from '../../DependencyInjection/Container';

export class EntireListContainer {
  public readonly adapter: EntireListAdapter = new EntireListAdapter();
  public readonly controller: EntireListController;

  constructor() {
    this.controller = new EntireListController(
      new EntireListPresenter(),
      new EntireListInteractor(GlobalContainer.listStorage)
    );
  }
}

const Container: EntireListContainer = new EntireListContainer();
export default Container;
