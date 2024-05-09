import UndoEntity from 'Core/Undo/UndoEntity';

export default interface ActionUndoMaker {
    undoAction(undoItem: UndoEntity): void;

    support(undoItem: UndoEntity): boolean;
}
