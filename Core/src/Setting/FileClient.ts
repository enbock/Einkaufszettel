import EntryEntity from 'Core/ShoppingList/EntryEntity';

export interface ImportDto {
    entireList: Array<EntryEntity>;
    shoppingList: Array<EntryEntity>;
}

export default interface FileClient {
    download(entireList: Array<EntryEntity>, shoppingList: Array<EntryEntity>): void;

    load(file: File): Promise<ImportDto>;
}
