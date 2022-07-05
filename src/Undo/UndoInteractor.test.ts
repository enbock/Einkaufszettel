import UndoInteractor from './UndoInteractor';
import {mock, MockProxy} from 'jest-mock-extended';
import UndoStorage from './Storage/UndoStorage';
import ActionUndoMaker from './InteractorTask/ActionUndoMaker';

describe(UndoInteractor, function () {
    let interactor: UndoInteractor,
        undoStorage: UndoStorage & MockProxy<UndoStorage>,
        task: ActionUndoMaker & MockProxy<ActionUndoMaker>
    ;

    beforeEach(function () {
        undoStorage = mock<UndoStorage>();
        task = mock<ActionUndoMaker>();

        interactor = new UndoInteractor(
            undoStorage,
            [task, task]
        );
    });

    it('should ignore not supported undo action', async function () {
        task.support.mockReturnValue(false);
        undoStorage.popLastItem.mockReturnValue('test::undoItem:' as MockedObject);

        interactor.undoOneAction();

        expect(task.support).toBeCalledWith('test::undoItem:');
        expect(task.undoAction).not.toBeCalled();
    });

    it('should execute first found action undo task', async function () {
        task.support.mockReturnValue(true);
        undoStorage.popLastItem.mockReturnValue('test::undoItem:' as MockedObject);

        interactor.undoOneAction();

        expect(task.support).toBeCalledTimes(1);
        expect(task.undoAction).toBeCalledWith('test::undoItem:');
    });
});
