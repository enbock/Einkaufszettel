import DownloadUseCase from './DownloadUseCase';
import DownloadClient from 'Core/Setting/DownloadClient';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

describe('DownloadUseCase', function (): void {
    let downloadUseCase: DownloadUseCase,
        downloadClient: Mocked<DownloadClient>,
        listStorage: Mocked<ListStorage>
    ;

    beforeEach(function (): void {
        downloadClient = mock<DownloadClient>();
        listStorage = mock<ListStorage>();

        downloadUseCase = new DownloadUseCase(
            downloadClient,
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
        expect(downloadClient.download).toHaveBeenCalledWith(entireList, shoppingList);
    });
});
