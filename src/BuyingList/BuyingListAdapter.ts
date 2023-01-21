import {EntryId} from '../ShoppingList/EntryEntity';
import ViewAdapter from '../ViewAdapter';

export default class BuyingListAdapter implements ViewAdapter {
    public onEntryButtonClick: Callback<(id: EntryId) => void> = Function;

    public onSelectClick: Callback<(id: EntryId) => void> = Function;

    public refresh: Callback = Function;

    public onFormInput: Callback = Function;
}
