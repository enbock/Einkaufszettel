import EntryEntity from '../../ShoppingList/EntryEntity';
import ListStorage from '../ListStorage/ListStorage';
import UndoEntity, {Actions} from '../../Undo/UndoEntity';
import UndoStorage from '../../Undo/Storage/UndoStorage';
import {SystemTabs} from '../../Navigation/TabEntity';
import SelectionStorage from '../SelectionStorage/SelectionStorage';
import FormMemory from '../../PrimaryInput/FormMemory/FormMemory';

export default class AddEntryToShoppingList {
    constructor(
        private storage: ListStorage,
        private undoStorage: UndoStorage,
        private selectionStorage: SelectionStorage,
        private formMemory: FormMemory
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
        this.selectionStorage.saveSelectedEntry('');
        this.formMemory.clearInputValue();
    }

    private removeIfExists(list: EntryEntity[], entry: EntryEntity): void {
        const onList: EntryEntity | undefined = list.find((e: EntryEntity): boolean => e.id == entry.id);
        if (onList === undefined) return;

        list.splice(list.indexOf(onList), 1);
    }
}
