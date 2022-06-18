import UndoStorage from '../UndoStorage';
import UndoEntity from '../UndoEntity';

export default class Memory implements UndoStorage {
    private undoItems: UndoEntity[] = [];

    public appendChange(undoItem: UndoEntity): void {
        this.undoItems.push(undoItem);
    }

    public hasItems(): boolean {
        return this.undoItems.length > 0;
    }

    public popLastItem(): UndoEntity {
        return this.undoItems.pop() || new UndoEntity();
    }
}
