import LocalListStorage from '../ListStorage/LocalStorage/LocalStorage';
import LocalStorageTransformer from '../ListStorage/LocalStorage/EntryListTransformer';
import ListStorage from '../ListStorage/ListStorage';
import NavigationSessionMemory from '../Memory/SessionMemory';
import BuyingListAdapter from '../BuyingList/View/BuyingListAdapter';
import FormMemory from '../FormMemory/FormMemory';
import TemporaryMemory from '../FormMemory/TemporaryMemory';
import PrimaryInputAdapter from '../PrimaryInput/View/PrimaryInputAdapter';
import SelectionStorage from '../SelectionStorage/SessionStorage/SessionStorage';

export class GlobalContainer {
    public readonly listStorage: ListStorage = new LocalListStorage(global.localStorage, new LocalStorageTransformer());
    public readonly navigationMemory: NavigationSessionMemory = new NavigationSessionMemory(window.sessionStorage);
    public readonly formMemory: FormMemory = new TemporaryMemory();
    public readonly selectionStorage: SelectionStorage = new SelectionStorage(global.sessionStorage);
    public readonly listAdapter: BuyingListAdapter = new BuyingListAdapter();
    public readonly inputAdapter: PrimaryInputAdapter = new PrimaryInputAdapter();
}

const Container: GlobalContainer = new GlobalContainer();
export default Container;
