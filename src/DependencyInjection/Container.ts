import LocalListStorage from '../EntireList/ListStorage/LocalStorage/LocalStorage';
import LocalStorageParser from '../EntireList/ListStorage/LocalStorage/Parser';
import ListStorage from '../EntireList/ListStorage/ListStorage';

export class GlobalContainer {
  public readonly listStorage: ListStorage = new LocalListStorage(global.localStorage, new LocalStorageParser());
}

const Container: GlobalContainer = new GlobalContainer();
export default Container;
