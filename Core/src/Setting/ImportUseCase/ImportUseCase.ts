import FileImportRequest from 'Core/Setting/ImportUseCase/FileImportRequest';
import FileClient, {ImportDto} from 'Core/Setting/FileClient';
import ListStorage from 'Core/BuyingList/ListStorage';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import UndoStorage from 'Core/Undo/UndoStorage';

export default class ImportUseCase {
    constructor(
        private fileClient: FileClient,
        private listStorage: ListStorage,
        private selectionStorage: SelectionStorage,
        private formMemory: FormMemory,
        private undoStorage: UndoStorage
    ) {
    }

    public async upload(request: FileImportRequest): Promise<void> {
        const data: ImportDto = await this.fileClient.load(request.file);

        this.listStorage.saveEntireList(data.entireList);
        this.listStorage.saveShoppingList(data.shoppingList);

        this.selectionStorage.saveSelectedEntry('');
        this.formMemory.clearInputValue();
        this.undoStorage.invalidate();
    }
}
