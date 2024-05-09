import ActionUndoMaker from './ActionUndoMaker';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import ListStorage from 'Core/BuyingList/ListStorage';

export default class RevertRename implements ActionUndoMaker {
    constructor(
        private storage: ListStorage
    ) {
    }

    public undoAction(undoItem: UndoEntity): void {
        const entireList: EntryEntity[] = this.storage.getEntireList();

        const foundEntry: EntryEntity | undefined = entireList.find(
            (e: EntryEntity): boolean => e.id == undoItem.entryId
        );
        if (foundEntry === undefined) return;

        foundEntry.name = undoItem.oldValue;
        this.storage.saveEntireList(entireList);
        this.replaceOnShoppingList(undoItem, foundEntry);
    }

    public support(undoItem: UndoEntity): boolean {
        return undoItem.action == Actions.RENAME;
    }

    private replaceOnShoppingList(undoItem: UndoEntity, foundEntry: EntryEntity): void {
        const shoppingList: EntryEntity[] = this.storage.getShoppingList();
        const shoppingListIndex: number | undefined = shoppingList.findIndex(
            (e: EntryEntity): boolean => e.id == undoItem.entryId
        );
        if (shoppingListIndex == -1) return;

        shoppingList.splice(shoppingListIndex, 1, foundEntry);
        this.storage.saveShoppingList(shoppingList);
    }
}
