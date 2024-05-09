import BuyingListLocalListStorage from 'Infrastructure/BuyingList/ListStorage/Browser/Browser';
import NavigationSessionMemory from 'Infrastructure/Navigation/StateStorage/Browser/Browser';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import TemporaryMemory from 'Infrastructure/PrimaryInput/FormMemory/TemporaryMemory';
import SelectionStorage from 'Infrastructure/BuyingList/SelectionStorage/Browser/Browser';
import BuyingListAdapter from '../BuyingList/BuyingListAdapter';
import PrimaryInputAdapter from '../PrimaryInput/PrimaryInputAdapter';
import StartUp from '../StartUp';
import NavigationAdapter from '../Navigation/NavigationAdapter';
import ShoppingListController from '../ShoppingList/Controller/Controller';
import ApplicationStorage from 'Core/ShoppingList/ApplicationStorage';
import StorageBrowser from 'Infrastructure/ShoppingList/ApplicationStorage/Browser/Browser';
import ShoppingListStorageTransformer from 'Infrastructure/ShoppingList/ApplicationStorage/Browser/Transformer';
import ActivePageInteractor from 'Core/ShoppingList/ActivePageUseCase/ActivePageInteractor';
import PageStateResponseFormatter from 'Core/ShoppingList/ActivePageUseCase/PageStateResponse/ResponseFormatter';
import PageStateResponseModelBuilder from 'Core/ShoppingList/ActivePageUseCase/PageStateResponse/ResponseModelBuilder';
import ShoppingListPresenter from '../ShoppingList/View/ShoppingListPresenter';
import ShoppingListBus from '../ShoppingList/Controller/Bus';
import LoadListTask from 'Core/BuyingList/ListUseCase/Task/LoadListTask';
import LoadEntireList from 'Core/BuyingList/ListUseCase/Task/LoadEntireList';
import LoadShoppingList from 'Core/BuyingList/ListUseCase/Task/LoadShoppingList';
import AddEntryToShoppingList from 'Core/BuyingList/ListUseCase/Task/AddEntryToShoppingList';
import BuyingListInteractor from 'Core/BuyingList/ListUseCase/ListUseCase';
import AddNewEntry from 'Core/BuyingList/ListUseCase/Task/AddNewEntry';
import UuidGenerator from 'Core/PrimaryInput/UniqueIdentifierGenerator/UuidGenerator';
import {v4 as UuidVersion4} from 'uuid';
import AddEntryIdToShoppingList from 'Core/BuyingList/ListUseCase/Task/AddEntryIdToShoppingList';
import UpdateEntry from 'Core/BuyingList/ListUseCase/Task/UpdateEntry';
import BuyingListController from 'Application/BuyingList/Controller/BuyingListController';
import BuyingListPresenter from 'Application/BuyingList/View/BuyingListPresenter';
import BuyingListLoadInteractor from 'Core/BuyingList/BuyingListLoadUseCase/BuyingListLoadInteractor';
import ParseHelper from 'Core/ParseHelper';
import PrimaryInputController from 'Application/PrimaryInput/Controller/PrimaryInputController';
import SaveInputValueInteractor from 'Core/PrimaryInput/InputValueUseCase/SaveInputValueInteractor';
import LoadInteractor from 'Core/PrimaryInput/UseCase/LoadInteractor';
import PrimaryInputPresenter from 'Application/PrimaryInput/View/PrimaryInputPresenter';
import RemoveInteractor from 'Core/PrimaryInput/RemoveUseCase/RemoveInteractor';
import NavigationController from 'Application/Navigation/Controller/NavigationController';
import NavigationInteractor from 'Core/Navigation/UseCase/NavigationInteractor';
import ConfigLoader from 'Core/Navigation/Config/ConfigLoader';
import NavigationPresenter from 'Application/Navigation/View/NavigationPresenter';
import UndoStorage from 'Core/Undo/UndoStorage';
import UndoStorageMemory from 'Infrastructure/Undo/Storage/Memory/Memory';
import UndoInteractor from 'Core/Undo/UseCase/UndoInteractor';
import RevertRename from 'Core/UndoUseCase/Task/RevertRename';
import RevertAddingList from 'Core/UndoUseCase/Task/RevertAddingList';
import RevertRemoveFromList from 'Core/UndoUseCase/Task/RevertRemoveFromList';
import RevertDeletion from 'Core/UndoUseCase/Task/RevertDeletion';
import RevertCreateAction from 'Core/UndoUseCase/Task/RevertCreateAction';
import BuyingListListStorageEntryListTransformer
    from 'Infrastructure/BuyingList/ListStorage/Browser/EntryListTransformer';

class Container {
    private parseHelper: ParseHelper = new ParseHelper();
    public listStorage: BuyingListLocalListStorage = new BuyingListLocalListStorage(global.localStorage,
        new BuyingListListStorageEntryListTransformer(
            this.parseHelper
        ));
    public navigationMemory: NavigationSessionMemory = new NavigationSessionMemory(window.sessionStorage);
    public formMemory: FormMemory = new TemporaryMemory();
    public selectionStorage: SelectionStorage = new SelectionStorage(global.sessionStorage);
    public listAdapter: BuyingListAdapter = new BuyingListAdapter();
    public primaryInputAdapter: PrimaryInputAdapter = new PrimaryInputAdapter();
    public navigationAdapter: NavigationAdapter = new NavigationAdapter();
    public startUp: StartUp = new StartUp(document);
    public shoppingListBus: ShoppingListBus = new ShoppingListBus();
    private applicationStorage: ApplicationStorage = new StorageBrowser(
        window.localStorage,
        new ShoppingListStorageTransformer(
            this.parseHelper
        )
    );
    private activePageInteractor: ActivePageInteractor = new ActivePageInteractor(
        this.applicationStorage,
        new PageStateResponseFormatter(
            new PageStateResponseModelBuilder()
        )
    );
    public controller: ShoppingListController = new ShoppingListController(
        this.activePageInteractor,
        new ShoppingListPresenter(),
        this.shoppingListBus
    );

    public adapter: BuyingListAdapter = this.listAdapter;
    public undoStorage: UndoStorage = new UndoStorageMemory();
    public undoInteractor: UndoInteractor = new UndoInteractor(
        this.undoStorage,
        [
            new RevertRename(this.listStorage),
            new RevertAddingList(this.listStorage),
            new RevertRemoveFromList(this.listStorage),
            new RevertDeletion(this.listStorage),
            new RevertCreateAction(
                this.listStorage,
                this.selectionStorage
            )
        ]
    );
    private loadListChain: LoadListTask[] = [
        new LoadEntireList(this.listStorage),
        new LoadShoppingList(this.listStorage)
    ];
    private addEntryToShoppingList: AddEntryToShoppingList = new AddEntryToShoppingList(
        this.listStorage,
        this.undoStorage,
        this.selectionStorage,
        this.formMemory
    );
    public buyingListInteractor: BuyingListInteractor = new BuyingListInteractor(
        this.listStorage,
        this.formMemory,
        this.navigationMemory,
        this.selectionStorage,
        this.loadListChain,
        new AddNewEntry(
            this.listStorage,
            new UuidGenerator(UuidVersion4),
            this.formMemory,
            this.navigationMemory,
            this.addEntryToShoppingList,
            this.undoStorage
        ),
        this.addEntryToShoppingList,
        new AddEntryIdToShoppingList(
            this.listStorage,
            this.addEntryToShoppingList
        ),
        new UpdateEntry(
            this.listStorage,
            this.selectionStorage,
            this.formMemory,
            this.navigationMemory,
            this.addEntryToShoppingList,
            this.undoStorage
        ),
        this.undoStorage
    );
    public buyingListController: BuyingListController = new BuyingListController(
        new BuyingListPresenter(),
        new BuyingListLoadInteractor(
            this.navigationMemory,
            this.loadListChain,
            this.formMemory
        ),
        this.buyingListInteractor,
        this.adapter,
        this.primaryInputAdapter,
        this.navigationAdapter
    );
    public primaryInputController: PrimaryInputController = new PrimaryInputController(
        this.primaryInputAdapter,
        this.buyingListInteractor,
        new SaveInputValueInteractor(this.formMemory),
        new LoadInteractor(
            this.formMemory,
            this.listStorage,
            this.navigationMemory
        ),
        new PrimaryInputPresenter(),
        this.adapter,
        new RemoveInteractor(
            this.listStorage,
            this.selectionStorage,
            this.formMemory,
            this.undoStorage
        ),
        this.navigationAdapter
    );

    public navigationController: NavigationController = new NavigationController(
        new NavigationInteractor(
            this.navigationMemory,
            new ConfigLoader(),
            this.undoStorage
        ),
        this.navigationAdapter,
        new NavigationPresenter(),
        this.listAdapter,
        this.primaryInputAdapter,
        this.undoInteractor,
        this.shoppingListBus
    );
}

const GlobalContainer: Container = new Container();
export default GlobalContainer;
