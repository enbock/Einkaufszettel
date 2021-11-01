import SelectionStorage from '../SelectionStorage';
import {EntryId} from '../../ListStorage/EntryEntity';

export default class SessionStorage implements SelectionStorage {
  constructor(
    private storage: Storage
  ) {
  }

  public getSelectedEntry(): EntryId {
    return this.storage.getItem('selected-entry') || '';
  }

  public saveSelectedEntry(selectedId: EntryId): void {
    this.storage.setItem('selected-entry', selectedId);
  }
}
