import EntireListAdapter from '../EntireListAdapter';
import EntireListController from '../EntireListController';
import EntireListModel from '../EntireListModel';
import EntireListInteractor, {Response} from '../EntireListInteractor';
import EntryEntity from '../EntryEntity';

export class EntireListContainer {
  public readonly adapter: EntireListAdapter = new EntireListAdapter();
  public readonly controller: EntireListController = new EntireListController(
    {
      presentList(response: Response): EntireListModel {
        /** TODO Implementation of EntireListPresenter */
        return new EntireListModel();
      }
    },
    new EntireListInteractor(
      {
        getEntireList(): EntryEntity[] {
          /** TODO Implementation of Storage */
          return [];
        }
      }
    )
  );
}

const Container: EntireListContainer = new EntireListContainer();
export default Container;
