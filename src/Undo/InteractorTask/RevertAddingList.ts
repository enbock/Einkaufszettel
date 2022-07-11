import ActionUndoMaker from './ActionUndoMaker';
import UndoEntity, {Actions} from '../UndoEntity';
import {SystemTabs} from '../../Navigation/TabEntity';
import ListStorage from '../../BuyingList/ListStorage/ListStorage';
import EntryEntity from '../../ShoppingList/EntryEntity';

export default class RevertAddingList implements ActionUndoMaker {
    constructor(
        private storage: ListStorage
    ) {
    }

    public undoAction(undoItem: UndoEntity): void {
        const shoppingList: EntryEntity[] = this.storage.getShoppingList();
        const index: number | undefined = shoppingList.findIndex((e: EntryEntity): boolean => e.id == undoItem.entryId);
        if (index == -1) return;
        shoppingList.splice(index, 1);
        this.storage.saveShoppingList(shoppingList);
    }

    public support(undoItem: UndoEntity): boolean {
        return undoItem.action == Actions.MOVE_TO_LIST && undoItem.target == SystemTabs.ShoppingList;
    }
}
