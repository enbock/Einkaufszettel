import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import ListStorage from 'Core/BuyingList/ListStorage';
import NavigationMemory from 'Core/Navigation/StateStorage';
import {TabId} from 'Core/Navigation/TabEntity';

export class LoadResponse {
    public inputValue: string = '';
    public entireList: EntryEntity[] = [];
    public shoppingList: EntryEntity[] = [];
    public currentTab: TabId = '';
}

export default class LoadInteractor {
    constructor(
        private formMemory: FormMemory,
        private listStorage: ListStorage,
        private navigationMemory: NavigationMemory
    ) {
    }

    loadData(): LoadResponse {
        const response: LoadResponse = new LoadResponse();
        response.inputValue = this.formMemory.readInputValue();
        response.entireList = this.listStorage.getEntireList();
        response.shoppingList = this.listStorage.getShoppingList();
        response.currentTab = this.navigationMemory.getActiveTab();
        return response;
    }
}
