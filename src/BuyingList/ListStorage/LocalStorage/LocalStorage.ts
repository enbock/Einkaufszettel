import ListStorage from '../ListStorage';
import EntryEntity from '../EntryEntity';
import EntryListTransformer from './EntryListTransformer';

export default class LocalStorage implements ListStorage {
  protected readonly storage: Storage;
  protected readonly transformer: EntryListTransformer;

  constructor(storage: Storage, transformer: EntryListTransformer) {
    this.storage = storage;
    this.transformer = transformer;
  }

  public getEntireList(): EntryEntity[] {
    return this.loadListFromStorage('entire-list');
  }

  public saveEntireList(list: EntryEntity[]): void {
    this.storage.setItem('entire-list', this.transformer.formatList(list));
  }

  public getShoppingList(): EntryEntity[] {
    return this.loadListFromStorage('shopping-list');
  }

  public saveShoppingList(list: EntryEntity[]): void {
    this.storage.setItem('shopping-list', this.transformer.formatList(list));
  }

  private loadListFromStorage(key: string) {
    const list: string | null = this.storage.getItem(key);
    if (list === null) return [];
    return this.transformer.parseList(list);
  }
}
