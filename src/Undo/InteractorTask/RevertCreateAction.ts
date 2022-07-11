import ActionUndoMaker from './ActionUndoMaker';
import UndoEntity, {Actions} from '../UndoEntity';
import ListStorage from '../../BuyingList/ListStorage/ListStorage';
import EntryEntity from '../../ShoppingList/EntryEntity';
import SelectionStorage from '../../BuyingList/SelectionStorage/SelectionStorage';

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
