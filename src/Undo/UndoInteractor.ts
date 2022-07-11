import UndoEntity from './UndoEntity';
import UndoStorage from './Storage/UndoStorage';
import ActionUndoMaker from './InteractorTask/ActionUndoMaker';

export default class UndoInteractor {
    constructor(
        private undoStorage: UndoStorage,
        private actionUndoMakers: ActionUndoMaker[]
    ) {
    }

    public undoOneAction(): void {
        const undoItem: UndoEntity = this.undoStorage.popLastItem();

        const foundTask: ActionUndoMaker | undefined = this.actionUndoMakers.find(
            (task: ActionUndoMaker): boolean => task.support(undoItem)
        );

        if (foundTask == undefined) return;
        foundTask.undoAction(undoItem);
    }
}
