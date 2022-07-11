import BuyingListModel, {EntryModel} from './BuyingListModel';
import {Response} from '../BuyingListLoadInteractor';
import EntryEntity from '../../ShoppingList/EntryEntity';
import Presenter from '../Presenter';

export default class BuyingListPresenter implements Presenter {
    public presentLoadResponse(response: Response): BuyingListModel {
        const entireListModel: BuyingListModel = new BuyingListModel();
        entireListModel.list = response.activeList.map(this.presentListEntry);
        return entireListModel;
    }

    private presentListEntry(entry: EntryEntity): EntryModel {
        const entryModel: EntryModel = new EntryModel();
        entryModel.label = entry.name;
        entryModel.id = entry.id;
        return entryModel;
    }
}
