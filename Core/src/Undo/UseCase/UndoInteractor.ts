import UndoEntity from 'Core/Undo/UndoEntity';
import UndoStorage from 'Core/Undo/UndoStorage';
import ActionUndoMaker from 'Core/UndoUseCase/Task/ActionUndoMaker';

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
