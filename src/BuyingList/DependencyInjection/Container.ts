import BuyingListAdapter from '../BuyingListAdapter';
import BuyingListController from '../BuyingListController';
import BuyingListLoadInteractor from '../BuyingListLoadInteractor';
import BuyingListPresenter from '../BuyingListPresenter';
import GlobalContainer from '../../DependencyInjection/Container';
import LoadEntireList from '../ListStorage/LoadList/LoadEntireList';
import LoadShoppingList from '../ListStorage/LoadList/LoadShoppingList';

export class BuyingListContainer {
  public readonly adapter: BuyingListAdapter = GlobalContainer.listAdapter;
  public readonly controller: BuyingListController;

  constructor() {
    const entireListLoadTask: LoadEntireList = new LoadEntireList(GlobalContainer.listStorage);
    const shoppingListLoadTask: LoadShoppingList = new LoadShoppingList(GlobalContainer.listStorage);
    this.controller = new BuyingListController(
      new BuyingListPresenter(),
      new BuyingListLoadInteractor(GlobalContainer.navigationMemory, [entireListLoadTask, shoppingListLoadTask]),
      this.adapter
    );
  }
}

const Container: BuyingListContainer = new BuyingListContainer();
export default Container;
