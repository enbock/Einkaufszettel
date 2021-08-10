import ListStorage from '../BuyingList/ListStorage/ListStorage';
import EntryEntity from '../BuyingList/ListStorage/EntryEntity';
import UniqueIdentifierGenerator from './UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from './FormMemory/FormMemory';
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
    if (list.indexOf(entry) != -1) return;
    list.push(entry);
    this.storage.saveShoppingList(list);
  }
}
