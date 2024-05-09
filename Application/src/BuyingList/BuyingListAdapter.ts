import {EntryId} from 'Core/ShoppingList/EntryEntity';
import ViewAdapter from '../ViewAdapter';

export default class BuyingListAdapter implements ViewAdapter {
    public onEntryButtonClick: Callback<(id: EntryId) => Promise<void>> = () => <never>false;

    public onSelectClick: Callback<(id: EntryId) => Promise<void>> = () => <never>false;

    public refresh: Callback = () => <never>false;

    public onFormInput: Callback = () => <never>false;
}
