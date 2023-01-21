import ListStorage from '../ListStorage';
import EntryEntity from '../../../ShoppingList/EntryEntity';
import EntryListTransformer from './EntryListTransformer';

export default class Browser implements ListStorage {

    constructor(
        private storage: Storage,
        private transformer: EntryListTransformer
    ) {
    }

    public getEntireList(): EntryEntity[] {
        return this.loadListFromStorage('entire-list');
    }

    public saveEntireList(list: EntryEntity[]): void {
        this.storage.setItem('entire-list', this.transformer.formatList(list));
    }

    public getShoppingList(): EntryEntity[] {
        return this.loadListFromStorage('shopping-list');
    }

    public saveShoppingList(list: EntryEntity[]): void {
        this.storage.setItem('shopping-list', this.transformer.formatList(list));
    }

    private loadListFromStorage(key: string) {
        const list: string | null = this.storage.getItem(key);
        if (list === null) return [];
        return this.transformer.parseList(list);
    }
}
