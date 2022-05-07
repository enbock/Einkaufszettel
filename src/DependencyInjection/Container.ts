import ListStorage from '../ListStorage/ListStorage';
import LocalListStorage from '../ListStorage/LocalStorage/LocalStorage';
import LocalStorageTransformer from '../ListStorage/LocalStorage/EntryListTransformer';
import NavigationSessionMemory from '../Memory/SessionMemory';
import FormMemory from '../FormMemory/FormMemory';
import TemporaryMemory from '../FormMemory/TemporaryMemory';
import SelectionStorage from '../SelectionStorage/SessionStorage/SessionStorage';
import BuyingListAdapter from '../BuyingList/View/BuyingListAdapter';
import PrimaryInputAdapter from '../PrimaryInput/View/PrimaryInputAdapter';
import StartUp from '../StartUp';
import ServiceWorkerUpdateLoader from '../ServiceWorkerUpdateLoader';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

class Container {
    public readonly listStorage: ListStorage = new LocalListStorage(global.localStorage, new LocalStorageTransformer());
    public readonly navigationMemory: NavigationSessionMemory = new NavigationSessionMemory(window.sessionStorage);
    public readonly formMemory: FormMemory = new TemporaryMemory();
    public readonly selectionStorage: SelectionStorage = new SelectionStorage(global.sessionStorage);
    public readonly listAdapter: BuyingListAdapter = new BuyingListAdapter();
    public readonly primaryInputAdapter: PrimaryInputAdapter = new PrimaryInputAdapter();
    public startUp: StartUp = new StartUp(
        document,
        new ServiceWorkerUpdateLoader(window.location),
        serviceWorkerRegistration
    );
}

const GlobalContainer: Container = new Container();
export default GlobalContainer;
