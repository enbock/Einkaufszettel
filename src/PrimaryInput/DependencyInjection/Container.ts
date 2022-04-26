import PrimaryInputController from '../View/PrimaryInputController';
import SaveInputValueInteractor from '../SaveInputValueInteractor';
import LoadInteractor from '../LoadInteractor';
import PrimaryInputPresenter from '../View/PrimaryInputPresenter';
import GlobalContainer from '../../DependencyInjection/Container';
import BuyingListContainer from '../../BuyingList/DependencyInjection/Container';
import RemoveInteractor from '../RemoveInteractor';

export class PrimaryInputContainer {
    public controller: PrimaryInputController;

    constructor() {
        this.controller = new PrimaryInputController(
            GlobalContainer.inputAdapter,
            BuyingListContainer.addEntryInteractor,
            new SaveInputValueInteractor(GlobalContainer.formMemory),
            new LoadInteractor(
                GlobalContainer.formMemory,
                GlobalContainer.listStorage,
                GlobalContainer.navigationMemory
            ),
            new PrimaryInputPresenter(),
            BuyingListContainer.adapter,
            new RemoveInteractor(
                GlobalContainer.navigationMemory,
                GlobalContainer.listStorage,
                GlobalContainer.selectionStorage,
                GlobalContainer.formMemory
            )
        );
    }
}

const Container: PrimaryInputContainer = new PrimaryInputContainer();
export default Container;
