import {EntryId} from '../ShoppingList/EntryEntity';
import ViewAdapter from '../ViewAdapter';

export default class BuyingListAdapter implements ViewAdapter {
    public onEntryButtonClick: Callback<(id: EntryId) => void>;

    public onSelectClick: Callback<(id: EntryId) => void>;

    public onListChange: Callback<() => void>;

    public onFormInput: Callback<() => void>;
}
