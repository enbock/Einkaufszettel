import EntireListModel from './EntireListModel';
import {Response} from './EntireListLoadInteractor';
import EntryEntity from './ListStorage/EntryEntity';
import EntryModel from './EntryModel';

export default class EntireListPresenter {
  private static presentListEntry(entry: EntryEntity): EntryModel {
    const entryModel: EntryModel = new EntryModel();
    entryModel.label = entry.name;
    entryModel.id = entry.id;
    return entryModel;
  }

  public presentLoadResponse(response: Response): EntireListModel {
    const entireListModel: EntireListModel = new EntireListModel();
    entireListModel.list = response.entireList.map(EntireListPresenter.presentListEntry);
    return entireListModel;
  }
}
