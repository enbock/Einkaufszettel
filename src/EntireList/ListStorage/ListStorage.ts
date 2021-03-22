import EntryEntity from './EntryEntity';

export default interface ListStorage {
  saveEntireList(list: EntryEntity[]): void;

  getEntireList(): EntryEntity[];
}
