import UndoStorage from '../Storage/UndoStorage';
import UndoStorageMemory from '../Storage/Memory/Memory';
import UndoInteractor from '../UndoInteractor';
import UndoCreateAction from '../InteractorTask/UndoCreateAction';
import GlobalContainer from '../../DependencyInjection/Container';

class Container {
    public storage: UndoStorage = new UndoStorageMemory();
    public interactor: UndoInteractor = new UndoInteractor(
        this.storage,
        [
            new UndoCreateAction(
                GlobalContainer.listStorage,
                GlobalContainer.selectionStorage
            )
        ]
    );
}

const UndoContainer: Container = new Container();
export default UndoContainer;
