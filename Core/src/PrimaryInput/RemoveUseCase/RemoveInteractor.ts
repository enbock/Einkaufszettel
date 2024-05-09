import ListStorage from 'Core/BuyingList/ListStorage';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';
import EntryEntity, {EntryId} from 'Core/ShoppingList/EntryEntity';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import UndoStorage from 'Core/Undo/UndoStorage';
import {SystemTabs} from 'Core/Navigation/TabEntity';

export default class RemoveInteractor {
    constructor(
        private listStorage: ListStorage,
        private selectionStorage: SelectionStorage,
        private formMemory: FormMemory,
        private undoStorage: UndoStorage
    ) {
    }

    public deleteEntry(): void {
        const currentEntryId: EntryId = this.selectionStorage.getSelectedEntry();
        const entireList: EntryEntity[] = this.listStorage.getEntireList();
        const itemToDelete: EntryEntity | undefined = entireList.find(
            (e: EntryEntity): boolean => e.id == currentEntryId
        );
        if (itemToDelete === undefined) return;

        const shoppingList: EntryEntity[] = this.listStorage.getShoppingList();
        const shoppingListLength: number = shoppingList.length;

        this.removeFromList(entireList, currentEntryId);
        this.removeFromList(shoppingList, currentEntryId);

        if (shoppingListLength != shoppingList.length) this.addUndoListItem(itemToDelete);

        this.listStorage.saveEntireList(entireList);
        this.listStorage.saveShoppingList(shoppingList);
        this.discardInput();

        const undoItem: UndoEntity = new UndoEntity();
        undoItem.action = Actions.DELETE;
        undoItem.entryId = itemToDelete.id;
        undoItem.oldValue = itemToDelete.name;
        this.undoStorage.appendChange(undoItem);
    }

    public discardInput(): void {
        this.formMemory.clearInputValue();
        this.selectionStorage.saveSelectedEntry('');
    }

    private removeFromList(list: EntryEntity[], id: EntryId): void {
        const index: number = list.findIndex((e: EntryEntity): boolean => e.id == id);
        list.splice(index, 1);
    }

    private addUndoListItem(itemToDelete: EntryEntity) {
        const listUndoItem: UndoEntity = new UndoEntity();
        listUndoItem.action = Actions.REMOVE_FROM_LIST;
        listUndoItem.target = SystemTabs.ShoppingList;
        listUndoItem.entryId = itemToDelete.id;
        this.undoStorage.appendChange(listUndoItem);
    }
}
