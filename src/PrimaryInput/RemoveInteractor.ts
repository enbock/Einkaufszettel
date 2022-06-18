import ListStorage from '../BuyingList/ListStorage/ListStorage';
import SelectionStorage from '../BuyingList/SelectionStorage/SelectionStorage';
import EntryEntity, {EntryId} from '../ShoppingList/EntryEntity';
import FormMemory from './FormMemory/FormMemory';

export default class RemoveInteractor {
    constructor(
        private listStorage: ListStorage,
        private selectionStorage: SelectionStorage,
        private formMemory: FormMemory
    ) {
    }

    public deleteEntry(): void {
        const currentEntryId: EntryId = this.selectionStorage.getSelectedEntry();
        const entireList: EntryEntity[] = this.listStorage.getEntireList();
        const shoppingList: EntryEntity[] = this.listStorage.getShoppingList();

        this.removeFromList(entireList, currentEntryId);
        this.removeFromList(shoppingList, currentEntryId);

        this.listStorage.saveEntireList(entireList);
        this.listStorage.saveShoppingList(shoppingList);
        this.discardInput();
    }

    public discardInput(): void {
        this.formMemory.clearInputValue();
        this.selectionStorage.saveSelectedEntry('');
    }

    private removeFromList(list: EntryEntity[], id: EntryId): void {
        for (let index: number = 0; index < list.length; index++) {
            if (list[index].id != id) continue;
            list.splice(index, 1);
            return;
        }
    }
}
