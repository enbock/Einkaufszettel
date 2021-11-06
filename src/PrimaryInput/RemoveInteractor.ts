import NavigationMemory from '../Memory/Memory';
import {SystemTabs} from '../Navigation/TabEntity';
import ListStorage from '../ListStorage/ListStorage';
import SelectionStorage from '../SelectionStorage/SelectionStorage';
import EntryEntity, {EntryId} from '../ListStorage/EntryEntity';
import FormMemory from '../FormMemory/FormMemory';

export default class RemoveInteractor {
  constructor(
    private navigationMemory: NavigationMemory,
    private listStorage: ListStorage,
    private selectionStorage: SelectionStorage,
    private formMemory: FormMemory
  ) {
  }

  public deleteOrDiscardEntry(): void {
    if (this.navigationMemory.getActiveTab() == SystemTabs.EntireList) this.deleteEntry();
    else this.discardEntry();
  }

  private deleteEntry() {
    const currentEntryId: EntryId = this.selectionStorage.getSelectedEntry();
    const entireList: EntryEntity[] = this.listStorage.getEntireList();
    const shoppingList: EntryEntity[] = this.listStorage.getShoppingList();

    this.removeFromList(entireList, currentEntryId);
    this.removeFromList(shoppingList, currentEntryId);

    this.listStorage.saveEntireList(entireList);
    this.listStorage.saveShoppingList(shoppingList);
    this.discardEntry();
  }

  private removeFromList(list: EntryEntity[], id: EntryId) {
    for (let index: number = 0; index < list.length; index++) {
      if (list[index].id != id) continue;
      list.splice(index, 1);
      return;
    }
  }

  private discardEntry() {
    this.formMemory.clearInputValue();
    this.selectionStorage.saveSelectedEntry('');
  }
}
