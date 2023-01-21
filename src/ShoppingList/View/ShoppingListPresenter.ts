import Presenter from '../Presenter';
import PageStateResponseModel from '../ActivePageInteractor/PageStateResponse/PageStateResponseModel';
import ShoppingListModel from './ShoppingListModel';
import Pages from '../Pages';

export default class ShoppingListPresenter implements Presenter {
    public present(state: PageStateResponseModel): ShoppingListModel {
        const model: ShoppingListModel = new ShoppingListModel();
        model.showBuyingList = state.activePage == Pages.LIST;
        model.showSetting = state.activePage == Pages.SETTING;
        return model;
    }
}
