import {TabId} from 'Core/Navigation/TabEntity';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

export default interface LoadListTask {
    support(activeTab: TabId): boolean;

    loadList(): EntryEntity[];
}
