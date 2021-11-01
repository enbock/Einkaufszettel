import BuyingListAdapter from '../React/BuyingListAdapter';
import BuyingListController from '../React/BuyingListController';
import BuyingListLoadInteractor from '../BuyingListLoadInteractor';
import BuyingListPresenter from '../React/BuyingListPresenter';
import GlobalContainer from '../../DependencyInjection/Container';
import LoadEntireList from '../InteractorTask/LoadEntireList';
import LoadShoppingList from '../InteractorTask/LoadShoppingList';
import ListInteractor from '../ListInteractor';
import UuidGenerator from '../../PrimaryInput/UniqueIdentifierGenerator/UuidGenerator';
import {v4 as UuidVersion4} from 'uuid';
import SelectionStorage from '../SelectionStorage/SessionStorage/SessionStorage';
import LoadListTask from '../InteractorTask/LoadListTask';

export class BuyingListContainer {
  public readonly adapter: BuyingListAdapter = GlobalContainer.listAdapter;
  private readonly loadListChain: LoadListTask[] = [
    new LoadEntireList(GlobalContainer.listStorage),
    new LoadShoppingList(GlobalContainer.listStorage)
  ];
  public readonly addEntryInteractor: ListInteractor = new ListInteractor(
    GlobalContainer.listStorage,
    new UuidGenerator(UuidVersion4),
    GlobalContainer.formMemory,
    GlobalContainer.navigationMemory,
    new SelectionStorage(global.sessionStorage),
    this.loadListChain
  );
  public readonly controller: BuyingListController = new BuyingListController(
    new BuyingListPresenter(),
    new BuyingListLoadInteractor(
      GlobalContainer.navigationMemory,
      this.loadListChain,
      GlobalContainer.formMemory
    ),
    this.addEntryInteractor,
    this.adapter,
    GlobalContainer.inputAdapter
  );
}

const Container: BuyingListContainer = new BuyingListContainer();
export default Container;
