import ListStorage from '../ListStorage';
import EntryEntity from '../EntryEntity';
import Parser from './Parser';

export default class LocalStorage implements ListStorage {
  protected readonly storage: Storage;
  protected readonly parser: Parser;

  constructor(storage: Storage, parser: Parser) {
    this.storage = storage;
    this.parser = parser;
  }

  public getEntireList(): EntryEntity[] {
    const list: string | null = this.storage.getItem('entire-list');
    if (list === null) return [];
    return this.parser.parseEntireList(list);
  }

  public addEntryToEntireList(entry: EntryEntity): void {
    // TODO EKZ-61 Implement persisting
  }
}
