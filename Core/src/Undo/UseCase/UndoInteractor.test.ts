import UndoInteractor from './UndoInteractor';
import UndoStorage from 'Core/Undo/UndoStorage';
import ActionUndoMaker from 'Core/UndoUseCase/Task/ActionUndoMaker';

describe('UndoInteracto', function (): void {
    let interactor: UndoInteractor,
        undoStorage: Mocked<UndoStorage>,
        task: Mocked<ActionUndoMaker>
    ;

    beforeEach(function (): void {
        undoStorage = mock<UndoStorage>();
        task = mock<ActionUndoMaker>();

        interactor = new UndoInteractor(
            undoStorage,
            [task, task]
        );
    });

    it('should ignore not supported undo action', async function (): Promise<void> {
        task.support.and.returnValue(false);
        undoStorage.popLastItem.and.returnValue(<MockedObject>'test::undoItem:');

        interactor.undoOneAction();

        expect(task.support).toHaveBeenCalledWith(<MockedObject>'test::undoItem:');
        expect(task.undoAction).not.toHaveBeenCalled();
    });

    it('should execute first found action undo task', async function (): Promise<void> {
        task.support.and.returnValue(true);
        undoStorage.popLastItem.and.returnValue(<MockedObject>'test::undoItem:');

        interactor.undoOneAction();

        expect(task.support).toHaveBeenCalledTimes(1);
        expect(task.undoAction).toHaveBeenCalledWith(<MockedObject>'test::undoItem:');
    });
});
