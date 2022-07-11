import ActionUndoMaker from './ActionUndoMaker';
import ListStorage from '../../BuyingList/ListStorage/ListStorage';
import UndoEntity, {Actions} from '../UndoEntity';
import EntryEntity from '../../ShoppingList/EntryEntity';
import {SystemTabs} from '../../Navigation/TabEntity';

export default class RevertRemoveFromList implements ActionUndoMaker {
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

        const shoppingList: EntryEntity[] = this.storage.getShoppingList();
        const index: number | undefined = shoppingList.findIndex((e: EntryEntity): boolean => e.id == undoItem.entryId);
        if (index != -1) return;

        shoppingList.push(foundEntry);
        this.storage.saveShoppingList(shoppingList);
    }

    public support(undoItem: UndoEntity): boolean {
        return undoItem.action == Actions.REMOVE_FROM_LIST && undoItem.target == SystemTabs.ShoppingList;
    }
}
