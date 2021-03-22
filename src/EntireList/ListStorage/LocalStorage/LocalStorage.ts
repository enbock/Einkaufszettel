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
    const list: string | null = this.storage.getItem('entire-list');
    if (list === null) return [];
    return this.transformer.parseEntireList(list);
  }

  public saveEntireList(list: EntryEntity[]): void {
    this.storage.setItem('entire-list', this.transformer.formatEntireList(list));
  }
}
