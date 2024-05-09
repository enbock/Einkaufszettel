import ActionUndoMaker from './ActionUndoMaker';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';

export default class RevertCreateAction implements ActionUndoMaker {
    constructor(
        private listStorage: ListStorage,
        private selectionStorage: SelectionStorage
    ) {
    }

    public undoAction(undoItem: UndoEntity): void {
        const entireList: EntryEntity[] = this.listStorage.getEntireList()
            .filter((e: EntryEntity): boolean => e.id != undoItem.entryId)
        ;
        const shoppingList: EntryEntity[] = this.listStorage.getShoppingList()
            .filter((e: EntryEntity): boolean => e.id != undoItem.entryId)
        ;
        this.listStorage.saveEntireList(entireList);
        this.listStorage.saveShoppingList(shoppingList);
        this.selectionStorage.saveSelectedEntry('');
    }

    public support(undoItem: UndoEntity): boolean {
        return undoItem.action == Actions.CREATE;
    }
}
