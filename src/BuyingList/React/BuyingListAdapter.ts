import {Adapter as ViewAdapter} from './BuyingList';
import {Adapter as ControllerAdapter} from './BuyingListController';

export default class BuyingListAdapter implements ViewAdapter, ControllerAdapter {
  public onEntryButtonClick(id: string): void {
  }

  public onListChange(): void {
  }

  public onFormInput(): void {
  }
}
