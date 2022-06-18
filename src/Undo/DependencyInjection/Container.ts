import UndoStorage from '../Storage/UndoStorage';
import UndoStorageMemory from '../Storage/Memory/Memory';

class Container {
    public storage: UndoStorage = new UndoStorageMemory();
}

const UndoContainer: Container = new Container();
export default UndoContainer;
