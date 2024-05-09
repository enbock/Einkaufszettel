import UndoEntity from 'Core/Undo/UndoEntity';

export default interface UndoStorage {
    appendChange(undoItem: UndoEntity): void;

    hasItems(): boolean;

    popLastItem(): UndoEntity;

    invalidate(): void;
}
