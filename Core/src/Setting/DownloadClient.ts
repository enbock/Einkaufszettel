import EntryEntity from 'Core/ShoppingList/EntryEntity';

export default interface DownloadClient {
    download(entireList: Array<EntryEntity>, shoppingList: Array<EntryEntity>): void;
}
