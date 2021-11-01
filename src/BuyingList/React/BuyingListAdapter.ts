import {Adapter as ViewAdapter} from './BuyingList';
import {Adapter as ControllerAdapter} from './BuyingListController';
import {EntryId} from '../ListStorage/EntryEntity';

export default class BuyingListAdapter implements ViewAdapter, ControllerAdapter {
  public onEntryButtonClick(id: EntryId): void {
  }

  public onSelectClick(id: EntryId): void {
  }

  public onListChange(): void {
  }

  public onFormInput(): void {
  }
}
