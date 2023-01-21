import ListStorage from '../BuyingList/ListStorage/ListStorage';
import LocalListStorage from '../BuyingList/ListStorage/Browser/Browser';
import LocalStorageTransformer from '../BuyingList/ListStorage/./Browser/EntryListTransformer';
import NavigationSessionMemory from '../Navigation/StateStorage/Browser/Browser';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';
import TemporaryMemory from '../PrimaryInput/FormMemory/TemporaryMemory';
import SelectionStorage from '../BuyingList/SelectionStorage/./Browser/Browser';
import BuyingListAdapter from '../BuyingList/BuyingListAdapter';
import PrimaryInputAdapter from '../PrimaryInput/PrimaryInputAdapter';
import StartUp from '../StartUp';
import ServiceWorkerUpdateLoader from '../ServiceWorkerUpdateLoader';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import NavigationAdapter from '../Navigation/NavigationAdapter';

class Container {
    public readonly listStorage: ListStorage = new LocalListStorage(global.localStorage, new LocalStorageTransformer());
    public readonly navigationMemory: NavigationSessionMemory = new NavigationSessionMemory(window.sessionStorage);
    public readonly formMemory: FormMemory = new TemporaryMemory();
    public readonly selectionStorage: SelectionStorage = new SelectionStorage(global.sessionStorage);
    public readonly listAdapter: BuyingListAdapter = new BuyingListAdapter();
    public readonly primaryInputAdapter: PrimaryInputAdapter = new PrimaryInputAdapter();
    public navigationAdapter: NavigationAdapter = new NavigationAdapter();
    public startUp: StartUp = new StartUp(
        document,
        new ServiceWorkerUpdateLoader(window.location),
        serviceWorkerRegistration
    );
}

const GlobalContainer: Container = new Container();
export default GlobalContainer;
