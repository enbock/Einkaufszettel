import DownloadUseCase from './DownloadUseCase';
import FileClient from 'Core/Setting/FileClient';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

describe('DownloadUseCase', function (): void {
    let downloadUseCase: DownloadUseCase,
        fileClient: Mocked<FileClient>,
        listStorage: Mocked<ListStorage>
    ;

    beforeEach(function (): void {
        fileClient = mock<FileClient>();
        listStorage = mock<ListStorage>();

        downloadUseCase = new DownloadUseCase(
            fileClient,
            listStorage
        );
    });

    it('should start download with entire list and shopping list', async function (): Promise<void> {
        const entireList: Array<EntryEntity> = <MockedObject>'test::entireList';
        const shoppingList: Array<EntryEntity> = <MockedObject>'test::shoppingList';

        listStorage.getEntireList.and.returnValue(entireList);
        listStorage.getShoppingList.and.returnValue(shoppingList);

        await downloadUseCase.startDownload();

        expect(listStorage.getEntireList).toHaveBeenCalled();
        expect(listStorage.getShoppingList).toHaveBeenCalled();
        expect(fileClient.download).toHaveBeenCalledWith(entireList, shoppingList);
    });
});
