import {EntryId} from '../ListStorage/EntryEntity';

export default interface SelectionStorage {
  getSelectedEntry(): EntryId;

  saveSelectedEntry(selectedId: EntryId): void;
}
