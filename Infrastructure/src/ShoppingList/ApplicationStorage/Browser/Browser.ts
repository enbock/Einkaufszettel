import Pages from 'Core/ShoppingList/Pages';
import Data from './Data';
import Transformer from './Transformer';

export default class Browser {
    public static storeKey: string = 'ApplicationStorage::data';

    constructor(
        private storage: Storage,
        private transformer: Transformer
    ) {
    }

    public setActivePage(page: Pages): void {
        const data: Data = this.transformer.parse(this.storage.getItem(Browser.storeKey));
        data.page = page;
        this.storage.setItem(Browser.storeKey, this.transformer.encode(data));
    }

    public getActivePage(): Pages {
        const data: string | null = this.storage.getItem(Browser.storeKey);
        return this.transformer.parse(data).page;
    }
}
