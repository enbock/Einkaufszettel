import PrimaryInputController from '../PrimaryInputController';
import SaveInputValueInteractor from '../SaveInputValueInteractor';
import LoadInteractor from '../LoadInteractor';
import PrimaryInputPresenter from '../View/PrimaryInputPresenter';
import GlobalContainer from '../../DependencyInjection/Container';
import BuyingListContainer from '../../BuyingList/DependencyInjection/Container';
import RemoveInteractor from '../RemoveInteractor';
import PrimaryInputAdapter from '../PrimaryInputAdapter';

export class Container {
    public readonly adapter: PrimaryInputAdapter = GlobalContainer.primaryInputAdapter;
    public controller: PrimaryInputController = new PrimaryInputController(
        this.adapter,
        BuyingListContainer.listInteractor,
        new SaveInputValueInteractor(GlobalContainer.formMemory),
        new LoadInteractor(
            GlobalContainer.formMemory,
            GlobalContainer.listStorage,
            GlobalContainer.navigationMemory
        ),
        new PrimaryInputPresenter(),
        BuyingListContainer.adapter,
        new RemoveInteractor(
            GlobalContainer.listStorage,
            GlobalContainer.selectionStorage,
            GlobalContainer.formMemory
        ),
        GlobalContainer.navigationAdapter
    );
}

const PrimaryInputContainer: Container = new Container();
export default PrimaryInputContainer;
