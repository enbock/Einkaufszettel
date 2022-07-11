import UndoStorage from '../Storage/UndoStorage';
import UndoStorageMemory from '../Storage/Memory/Memory';
import UndoInteractor from '../UndoInteractor';
import RevertCreateAction from '../InteractorTask/RevertCreateAction';
import GlobalContainer from '../../DependencyInjection/Container';
import RevertDeletion from '../InteractorTask/RevertDeletion';
import RevertRename from '../InteractorTask/RevertRename';
import RevertAddingList from '../InteractorTask/RevertAddingList';
import RevertRemoveFromList from '../InteractorTask/RevertRemoveFromList';

class Container {
    public storage: UndoStorage = new UndoStorageMemory();
    public interactor: UndoInteractor = new UndoInteractor(
        this.storage,
        [
            new RevertRename(GlobalContainer.listStorage),
            new RevertAddingList(GlobalContainer.listStorage),
            new RevertRemoveFromList(GlobalContainer.listStorage),
            new RevertDeletion(GlobalContainer.listStorage),
            new RevertCreateAction(
                GlobalContainer.listStorage,
                GlobalContainer.selectionStorage
            )
        ]
    );
}

const UndoContainer: Container = new Container();
export default UndoContainer;
