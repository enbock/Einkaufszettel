import EntryEntity from './EntryEntity';

export default interface ListStorage {
  addEntryToEntireList(entry: EntryEntity): void;

  getEntireList(): EntryEntity[];
}
