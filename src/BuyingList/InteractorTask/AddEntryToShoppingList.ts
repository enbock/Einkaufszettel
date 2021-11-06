import EntryEntity from '../../ListStorage/EntryEntity';
import ListStorage from '../../ListStorage/ListStorage';

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

  private removeIfExists(list: EntryEntity[], entry: EntryEntity): void {
    for (let index: number = 0; index < list.length; index++) {
      const entity: EntryEntity = list[index];
      if (entity.id != entry.id) continue;
      list.splice(index, 1);
      return;
    }
  }
}
