import BuyingListAdapter from '../View/BuyingListAdapter';
import BuyingListController from '../View/BuyingListController';
import BuyingListLoadInteractor from '../BuyingListLoadInteractor';
import BuyingListPresenter from '../View/BuyingListPresenter';
import GlobalContainer from '../../DependencyInjection/Container';
import LoadEntireList from '../InteractorTask/LoadEntireList';
import LoadShoppingList from '../InteractorTask/LoadShoppingList';
import ListInteractor from '../ListInteractor';
import UuidGenerator from '../../PrimaryInput/UniqueIdentifierGenerator/UuidGenerator';
import {v4 as UuidVersion4} from 'uuid';
import LoadListTask from '../InteractorTask/LoadListTask';
import AddNewEntry from '../InteractorTask/AddNewEntry';
import AddEntryToShoppingList from '../InteractorTask/AddEntryToShoppingList';
import AddEntryIdToShoppingList from '../InteractorTask/AddEntryIdToShoppingList';
import UpdateEntry from '../InteractorTask/UpdateEntry';

export class BuyingListContainer {
    public readonly adapter: BuyingListAdapter = GlobalContainer.listAdapter;
    private readonly loadListChain: LoadListTask[] = [
        new LoadEntireList(GlobalContainer.listStorage),
        new LoadShoppingList(GlobalContainer.listStorage)
    ];
    public controller: BuyingListController = new BuyingListController(
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
    private readonly addEntryToShoppingList: AddEntryToShoppingList = new AddEntryToShoppingList(GlobalContainer.listStorage);
    public readonly addEntryInteractor: ListInteractor = new ListInteractor(
        GlobalContainer.listStorage,
        GlobalContainer.formMemory,
        GlobalContainer.navigationMemory,
        GlobalContainer.selectionStorage,
        this.loadListChain,
        new AddNewEntry(
            GlobalContainer.listStorage,
            new UuidGenerator(UuidVersion4),
            GlobalContainer.formMemory,
            GlobalContainer.navigationMemory,
            this.addEntryToShoppingList
        ),
        this.addEntryToShoppingList,
        new AddEntryIdToShoppingList(
            GlobalContainer.listStorage,
            this.addEntryToShoppingList
        ),
        new UpdateEntry(
            GlobalContainer.listStorage,
            GlobalContainer.selectionStorage,
            GlobalContainer.formMemory,
            GlobalContainer.navigationMemory,
            this.addEntryToShoppingList
        )
    );
}

const Container: BuyingListContainer = new BuyingListContainer();
export default Container;
