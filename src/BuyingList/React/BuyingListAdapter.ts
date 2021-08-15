import {Adapter as ViewAdapter} from './BuyingList';
import {Adapter as ControllerAdapter} from './BuyingListController';
import {EntryEntityId} from '../ListStorage/EntryEntity';

export default class BuyingListAdapter implements ViewAdapter, ControllerAdapter {
  public onEntryButtonClick(id: EntryEntityId): void {
  }

  public onListChange(): void {
  }

  public onFormInput(): void {
  }
}
