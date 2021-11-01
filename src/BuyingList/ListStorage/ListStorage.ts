import EntryEntity from './EntryEntity';

export default interface ListStorage {
  getEntireList(): EntryEntity[];

  saveEntireList(list: EntryEntity[]): void;

  getShoppingList(): EntryEntity[];

  saveShoppingList(list: EntryEntity[]): void;
}
