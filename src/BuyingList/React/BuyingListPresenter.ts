import BuyingListModel from './BuyingListModel';
import {Response} from '../BuyingListLoadInteractor';
import EntryEntity from '../ListStorage/EntryEntity';
import EntryModel from './EntryModel';

export default class BuyingListPresenter {
  private static presentListEntry(entry: EntryEntity): EntryModel {
    const entryModel: EntryModel = new EntryModel();
    entryModel.label = entry.name;
    entryModel.id = entry.id;
    return entryModel;
  }

  public presentLoadResponse(response: Response): BuyingListModel {
    const entireListModel: BuyingListModel = new BuyingListModel();
    entireListModel.list = response.activeList.map(BuyingListPresenter.presentListEntry);
    return entireListModel;
  }
}
