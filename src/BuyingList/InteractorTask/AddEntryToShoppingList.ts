import EntryEntity from '../../ShoppingList/EntryEntity';
import ListStorage from '../ListStorage/ListStorage';
import UndoEntity, {Actions} from '../../Undo/Storage/UndoEntity';
import UndoStorage from '../../Undo/Storage/UndoStorage';
import {SystemTabs} from '../../Navigation/TabEntity';

export default class AddEntryToShoppingList {
    constructor(
        private storage: ListStorage,
        private undoStorage: UndoStorage
    ) {
    }

    public addToShoppingList(entry: EntryEntity): void {
        const list: EntryEntity[] = this.storage.getShoppingList();
        const shoppingListLength: number = list.length;

        const undo: UndoEntity = new UndoEntity();
        undo.action = Actions.MOVE_TO_LIST;
        undo.target = SystemTabs.ShoppingList;
        undo.entryId = entry.id;

        this.removeIfExists(list, entry);
        list.push(entry);

        this.storage.saveShoppingList(list);
        if (shoppingListLength != list.length) this.undoStorage.appendChange(undo);
    }

    private removeIfExists(list: EntryEntity[], entry: EntryEntity): void {
        const onList: EntryEntity | undefined = list.find((e: EntryEntity): boolean => e.id == entry.id);
        if (onList === undefined) return;

        list.splice(list.indexOf(onList), 1);
    }
}
