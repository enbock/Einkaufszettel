import ListStorage from './ListStorage/ListStorage';
import EntryEntity, {EntryEntityId} from './ListStorage/EntryEntity';
import UniqueIdentifierGenerator from '../PrimaryInput/UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';
import NavigationMemory from '../Navigation/Memory/Memory';
import {SystemTabs} from '../Navigation/TabEntity';

export default class AddEntryInteractor {
  constructor(
    private storage: ListStorage,
    private idGenerator: UniqueIdentifierGenerator,
    private formMemory: FormMemory,
    private navigationMemory: NavigationMemory
  ) {
  }

  public addNewEntry(): void {
    let entry: EntryEntity = new EntryEntity();
    entry.id = this.idGenerator.generate();
    entry.name = this.formMemory.readInputValue();

    const currentList: EntryEntity[] = this.storage.getEntireList();
    const foundExistingEntries = currentList.filter(
      (e: EntryEntity) => e.name.trim().toLowerCase() == entry.name.trim().toLowerCase()
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

  public addEntryIdToShoppingList(id: EntryEntityId): void {
    const list: EntryEntity[] = this.storage.getEntireList();
    const foundEntry: EntryEntity[] = list.filter((e: EntryEntity): boolean => e.id == id);
    if (foundEntry.length == 0) return;
    this.addToShoppingList(foundEntry[0]);
  }
}
