import UndoEntity from './UndoEntity';

export default interface UndoStorage {
    appendChange(undoItem: UndoEntity): void;

    hasItems(): boolean;

    popLastItem(): UndoEntity;
}
