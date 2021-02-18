import EntireListModel from './EntireListModel';
import {Response} from './EntireListInteractor';
import EntryEntity from './EntryEntity';
import EntryModel from './EntryModel';

export default class EntireListPresenter {
  public presentLoadResponse(response: Response): EntireListModel {
    const entireListModel: EntireListModel = new EntireListModel();
    entireListModel.list = response.entireList.map(EntireListPresenter.presentListEntry);
    return entireListModel;
  }

  private static presentListEntry(entry: EntryEntity): EntryModel {
    const entryModel:EntryModel = new EntryModel();
    entryModel.label = entry.name;
    entryModel.id = entry.id;
    return entryModel;
  }
}
