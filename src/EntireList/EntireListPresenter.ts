import EntireListModel from './EntireListModel';
import {Response} from './EntireListInteractor';

export default interface EntireListPresenter {
  presentList: (response: Response) => EntireListModel
}
