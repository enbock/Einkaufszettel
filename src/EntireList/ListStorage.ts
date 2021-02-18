import EntryEntity from './EntryEntity';

export default interface ListStorage {
  getEntireList(): EntryEntity[];
}
