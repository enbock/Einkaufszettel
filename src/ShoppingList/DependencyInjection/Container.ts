import ApplicationStorage from '../ApplicationStorage/ApplicationStorage';
import StorageBrowser from '../ApplicationStorage/Browser/Browser';
import StorageTransformer from '../ApplicationStorage/Browser/Transformer';
import ActivePageInteractor from '../ActivePageInteractor/ActivePageInteractor';
import PageStateResponseFormatter from '../ActivePageInteractor/PageStateResponse/ResponseFormatter';
import PageStateResponseModelBuilder from '../ActivePageInteractor/PageStateResponse/ResponseModelBuilder';

class Container {
    private applicationStorage: ApplicationStorage = new StorageBrowser(
        window.localStorage,
        new StorageTransformer()
    );

    public activePageInteractor: ActivePageInteractor = new ActivePageInteractor(
        this.applicationStorage,
        new PageStateResponseFormatter(
            new PageStateResponseModelBuilder()
        )
    );
}

const GlobalContainer: Container = new Container();
export default GlobalContainer;
