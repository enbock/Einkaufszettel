import LocalListStorage from '../BuyingList/ListStorage/LocalStorage/LocalStorage';
import LocalStorageTransformer from '../BuyingList/ListStorage/LocalStorage/EntryListTransformer';
import ListStorage from '../BuyingList/ListStorage/ListStorage';
import NavigationSessionMemory from '../Navigation/Memory/SessionMemory';
import BuyingListAdapter from '../BuyingList/React/BuyingListAdapter';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';
import TemporaryMemory from '../PrimaryInput/FormMemory/TemporaryMemory';

export class GlobalContainer {
  public readonly listStorage: ListStorage = new LocalListStorage(global.localStorage, new LocalStorageTransformer());
  public readonly navigationMemory: NavigationSessionMemory = new NavigationSessionMemory(window.sessionStorage);
  public readonly listAdapter: BuyingListAdapter = new BuyingListAdapter();
  public readonly formMemory: FormMemory = new TemporaryMemory();
}

const Container: GlobalContainer = new GlobalContainer();
export default Container;
