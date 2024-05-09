import FileClient from 'Core/Setting/FileClient';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

export default class DownloadUseCase {
    constructor(
        private fileClient: FileClient,
        private listStorage: ListStorage
    ) {
    }

    public async startDownload(): Promise<void> {
        const entireList: Array<EntryEntity> = this.listStorage.getEntireList();
        const shoppingList: Array<EntryEntity> = this.listStorage.getShoppingList();

        this.fileClient.download(entireList, shoppingList);
    }
}
