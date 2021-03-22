import LocalListStorage from '../EntireList/ListStorage/LocalStorage/LocalStorage';
import LocalStorageTransformer from '../EntireList/ListStorage/LocalStorage/EntryListTransformer';
import ListStorage from '../EntireList/ListStorage/ListStorage';

export class GlobalContainer {
  public readonly listStorage: ListStorage = new LocalListStorage(global.localStorage, new LocalStorageTransformer());
}

const Container: GlobalContainer = new GlobalContainer();
export default Container;
