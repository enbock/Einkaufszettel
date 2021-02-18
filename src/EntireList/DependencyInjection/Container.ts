import EntireListAdapter from '../EntireListAdapter';
import EntireListController from '../EntireListController';
import EntireListModel from '../EntireListModel';
import {Response} from '../EntireListInteractor';

export class EntireListContainer {
  public readonly adapter: EntireListAdapter = new EntireListAdapter();
  public readonly controller: EntireListController = new EntireListController(
    {
      presentList(response: Response): EntireListModel {
        /** TODO Implementation of EntireListPresenter */
        return new EntireListModel();
      }
    },
    {
      loadEntireList(): Response {
        /** TODO Implementation of EntireListInteractor */
        return new Response();
      }
    }
  );
}

const Container: EntireListContainer = new EntireListContainer();
export default Container;
