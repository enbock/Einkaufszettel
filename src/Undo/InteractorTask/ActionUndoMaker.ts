import UndoEntity from '../Storage/UndoEntity';

export default interface ActionUndoMaker {
    undoAction(undoItem: UndoEntity): void;

    support(undoItem: UndoEntity): boolean;
}
