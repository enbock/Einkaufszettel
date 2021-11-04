import EntryEntity from '../ListStorage/EntryEntity';
import ListStorage from '../ListStorage/ListStorage';

export default class AddEntryToShoppingList {
  constructor(
    private storage: ListStorage
  ) {
  }

  public addToShoppingList(entry: EntryEntity): void {
    const list: EntryEntity[] = this.storage.getShoppingList();

    this.removeIfExists(list, entry);
    list.push(entry);

    this.storage.saveShoppingList(list);
  }

  private removeIfExists(list: EntryEntity[], entry: EntryEntity) {
    const isExisting: boolean = list.filter((e: EntryEntity): boolean => e.id == entry.id).length > 0;
    if (isExisting) list.splice(list.indexOf(entry), 1);
  }
}
