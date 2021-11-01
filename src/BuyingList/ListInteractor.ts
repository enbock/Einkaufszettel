import ListStorage from './ListStorage/ListStorage';
import EntryEntity, {EntryId} from './ListStorage/EntryEntity';
import UniqueIdentifierGenerator from '../PrimaryInput/UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';
import NavigationMemory from '../Navigation/Memory/Memory';
import {SystemTabs, TabId} from '../Navigation/TabEntity';
import SelectionStorage from './SelectionStorage/SelectionStorage';
import LoadListTask from './InteractorTask/LoadListTask';

export default class ListInteractor {
  constructor(
    private storage: ListStorage,
    private idGenerator: UniqueIdentifierGenerator,
    private formMemory: FormMemory,
    private navigationMemory: NavigationMemory,
    private selectionStorage: SelectionStorage,
    private loadListChain: LoadListTask[]
  ) {
  }

  public addNewEntry(): void {
    let entry: EntryEntity = new EntryEntity();
    entry.id = this.idGenerator.generate();
    entry.name = this.formMemory.readInputValue();

    const currentList: EntryEntity[] = this.storage.getEntireList();
    const foundExistingEntries: EntryEntity[] = currentList.filter(
      (e: EntryEntity): boolean => e.name.trim().toLowerCase() == entry.name.trim().toLowerCase()
    );
    const alreadyExisting: boolean = foundExistingEntries.length > 0;
    if (alreadyExisting == false) currentList.push(entry);
    else entry = foundExistingEntries[0];

    this.storage.saveEntireList(currentList);
    this.formMemory.clearInputValue();

    if (this.navigationMemory.getActiveTab() == SystemTabs.ShoppingList) this.addToShoppingList(entry);
  }

  public addToShoppingList(entry: EntryEntity): void {
    const list: EntryEntity[] = this.storage.getShoppingList();
    if (list.filter((e: EntryEntity): boolean => e.id == entry.id).length > 0) return;
    list.push(entry);
    this.storage.saveShoppingList(list);
  }

  public addOrRemoveEntry(id: EntryId): void {
    if (this.navigationMemory.getActiveTab() == SystemTabs.ShoppingList) this.removeEntryIdFromShoppingList(id);
    else this.addEntryIdToShoppingList(id);
  }

  public removeEntryIdFromShoppingList(id: EntryId) {
    const list: EntryEntity[] = this.storage.getShoppingList().filter((e: EntryEntity): boolean => e.id != id);
    this.storage.saveShoppingList(list);
  }

  public changeSelectedEntry(selectedId: EntryId) {
    this.selectionStorage.saveSelectedEntry(selectedId);

    const activeTab: TabId = this.navigationMemory.getActiveTab();
    let activeList: EntryEntity[] = [];
    for (const loadTask of this.loadListChain) {
      if (loadTask.support(activeTab) === false) continue;
      activeList = loadTask.loadList();
    }

    const selectedEntry: EntryEntity = activeList.filter((e: EntryEntity): boolean => e.id == selectedId)[0];
    this.formMemory.storeInputValue(selectedEntry.name);
  }

  private addEntryIdToShoppingList(id: EntryId) {
    const list: EntryEntity[] = this.storage.getEntireList();
    const foundEntry: EntryEntity[] = list.filter((e: EntryEntity): boolean => e.id == id);
    if (foundEntry.length == 0) return;
    this.addToShoppingList(foundEntry[0]);
  }
}
