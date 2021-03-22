import {Adapter as ViewAdapter} from './EntireList';
import {Adapter as ControllerAdapter} from './EntireListController';

export default class EntireListAdapter implements ViewAdapter, ControllerAdapter {
  public onEntryButtonClick(id: string): void {
  }

  public onListChange(): void {
  }
}
