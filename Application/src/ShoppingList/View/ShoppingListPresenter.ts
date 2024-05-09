import Presenter from '../Presenter';
import PageStateResponseModel from 'Core/ShoppingList/ActivePageUseCase/PageStateResponse/PageStateResponseModel';
import ShoppingListModel from './ShoppingListModel';
import Pages from 'Core/ShoppingList/Pages';

export default class ShoppingListPresenter implements Presenter {
    public present(state: PageStateResponseModel): ShoppingListModel {
        const model: ShoppingListModel = new ShoppingListModel();
        model.showBuyingList = state.activePage == Pages.LIST;
        model.showSetting = state.activePage == Pages.SETTING;
        return model;
    }
}
