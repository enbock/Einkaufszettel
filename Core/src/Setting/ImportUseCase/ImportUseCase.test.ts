import ImportUseCase from './ImportUseCase';
import FileClient, {ImportDto} from 'Core/Setting/FileClient';
import ListStorage from 'Core/BuyingList/ListStorage';
import SelectionStorage from 'Core/BuyingList/SelectionStorage';
import FileImportRequest from 'Core/Setting/ImportUseCase/FileImportRequest';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import UndoStorage from 'Core/Undo/UndoStorage';

describe('ImportUseCase', function (): void {
    let useCase: ImportUseCase,
        fileClient: Mocked<FileClient>,
        listStorage: Mocked<ListStorage>,
        selectionStorage: Mocked<SelectionStorage>,
        formMemory: Mocked<FormMemory>,
        undoStorage: Mocked<UndoStorage>
    ;

    beforeEach(function (): void {
        fileClient = mock<FileClient>();
        listStorage = mock<ListStorage>();
        selectionStorage = mock<SelectionStorage>();
        formMemory = mock<FormMemory>();
        undoStorage = mock<UndoStorage>();

        useCase = new ImportUseCase(
            fileClient,
            listStorage,
            selectionStorage,
            formMemory,
            undoStorage
        );
    });

    it('should upload data ', async function (): Promise<void> {
        const file: File = <MockedObject>'test::file';
        const data: ImportDto = {
            entireList: <MockedObject>'test::entireList',
            shoppingList: <MockedObject>'test::shoppingList'
        };

        fileClient.load.and.resolveTo(data);

        const request: FileImportRequest = {file: file};
        await useCase.upload(request);

        expect(fileClient.load).toHaveBeenCalledWith(file);
        expect(listStorage.saveEntireList).toHaveBeenCalledWith(data.entireList);
        expect(listStorage.saveShoppingList).toHaveBeenCalledWith(data.shoppingList);
        expect(selectionStorage.saveSelectedEntry).toHaveBeenCalledWith('');
        expect(formMemory.clearInputValue).toHaveBeenCalled();
        expect(undoStorage.invalidate).toHaveBeenCalled();
    });
});
