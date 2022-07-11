import ActionUndoMaker from './ActionUndoMaker';
import UndoEntity, {Actions} from '../UndoEntity';
import ListStorage from '../../BuyingList/ListStorage/ListStorage';
import EntryEntity from '../../ShoppingList/EntryEntity';

export default class RevertDeletion implements ActionUndoMaker {
    constructor(
        private storage: ListStorage
    ) {
    }

    public undoAction(undoItem: UndoEntity): void {
        const entireList: EntryEntity[] = this.storage.getEntireList();
        const foundEntry: EntryEntity | undefined = entireList.find(
            (e: EntryEntity): boolean => e.id == undoItem.entryId
        );
        if (foundEntry !== undefined) return;

        const entry: EntryEntity = new EntryEntity();
        entry.id = undoItem.entryId;
        entry.name = undoItem.oldValue;
        entireList.push(entry);

        this.storage.saveEntireList(entireList);
    }

    public support(undoItem: UndoEntity): boolean {
        return undoItem.action == Actions.DELETE;
    }
}
