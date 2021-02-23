import EntireListAdapter from '../EntireListAdapter';
import EntireListController from '../EntireListController';
import EntireListInteractor from '../EntireListInteractor';
import EntireListPresenter from '../EntireListPresenter';
import LocalListStorage from '../ListStorage/LocalStorage/LocalStorage';
import LocalStorageParser from '../ListStorage/LocalStorage/Parser';

export class EntireListContainer {
  public readonly adapter: EntireListAdapter = new EntireListAdapter();
  public readonly controller: EntireListController;

  constructor() {
    const listStorage = new LocalListStorage(global.localStorage, new LocalStorageParser());
    this.controller = new EntireListController(
      new EntireListPresenter(),
      new EntireListInteractor(listStorage)
    );
  }
}

const Container: EntireListContainer = new EntireListContainer();
export default Container;
