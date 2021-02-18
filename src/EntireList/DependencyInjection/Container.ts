import EntireListAdapter from '../EntireListAdapter';
import EntireListController from '../EntireListController';
import EntireListInteractor from '../EntireListInteractor';
import EntryEntity from '../EntryEntity';
import EntireListPresenter from '../EntireListPresenter';

export class EntireListContainer {
  public readonly adapter: EntireListAdapter = new EntireListAdapter();
  public readonly controller: EntireListController = new EntireListController(
    new EntireListPresenter(),
    new EntireListInteractor(
      {
        getEntireList(): EntryEntity[] {
          /** TODO Implementation of Storage */
          return [new EntryEntity()];
        }
      }
    )
  );
}

const Container: EntireListContainer = new EntireListContainer();
export default Container;
