import BuyingListAdapter from '../React/BuyingListAdapter';
import BuyingListController from '../React/BuyingListController';
import BuyingListLoadInteractor from '../BuyingListLoadInteractor';
import BuyingListPresenter from '../React/BuyingListPresenter';
import GlobalContainer from '../../DependencyInjection/Container';
import LoadEntireList from '../ListStorage/LoadList/LoadEntireList';
import LoadShoppingList from '../ListStorage/LoadList/LoadShoppingList';
import ListInteractor from '../ListInteractor';
import UuidGenerator from '../../PrimaryInput/UniqueIdentifierGenerator/UuidGenerator';
import {v4 as UuidVersion4} from 'uuid';

export class BuyingListContainer {
  public readonly adapter: BuyingListAdapter = GlobalContainer.listAdapter;
  public readonly addEntryInteractor: ListInteractor = new ListInteractor(
    GlobalContainer.listStorage,
    new UuidGenerator(UuidVersion4),
    GlobalContainer.formMemory,
    GlobalContainer.navigationMemory
  );
  public readonly controller: BuyingListController = new BuyingListController(
    new BuyingListPresenter(),
    new BuyingListLoadInteractor(
      GlobalContainer.navigationMemory,
      [
        new LoadEntireList(GlobalContainer.listStorage),
        new LoadShoppingList(GlobalContainer.listStorage)
      ],
      GlobalContainer.formMemory
    ),
    this.adapter,
    this.addEntryInteractor
  );
}

const Container: BuyingListContainer = new BuyingListContainer();
export default Container;
