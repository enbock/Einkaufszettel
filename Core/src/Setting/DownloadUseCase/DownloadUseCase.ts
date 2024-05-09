import DownloadClient from 'Core/Setting/DownloadClient';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

export default class DownloadUseCase {
    constructor(
        private downloadClient: DownloadClient,
        private listStorage: ListStorage
    ) {
    }

    public async startDownload(): Promise<void> {
        const entireList: Array<EntryEntity> = this.listStorage.getEntireList();
        const shoppingList: Array<EntryEntity> = this.listStorage.getShoppingList();

        this.downloadClient.download(entireList, shoppingList);
    }
}
