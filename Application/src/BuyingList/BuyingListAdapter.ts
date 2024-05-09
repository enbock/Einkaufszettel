import {EntryId} from 'Core/ShoppingList/EntryEntity';

export default class BuyingListAdapter {
    public onEntryButtonClick: Callback<(id: EntryId) => Promise<void>> = () => <never>false;
    public onSelectClick: Callback<(id: EntryId) => Promise<void>> = () => <never>false;
    public refresh: Callback = () => <never>false;
    public onFormInput: Callback = () => <never>false;
}
