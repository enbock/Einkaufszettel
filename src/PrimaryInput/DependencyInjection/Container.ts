import PrimaryInputController from '../React/PrimaryInputController';
import SaveInputValueInteractor from '../SaveInputValueInteractor';
import LoadInteractor from '../LoadInteractor';
import PrimaryInputPresenter from '../React/PrimaryInputPresenter';
import GlobalContainer from '../../DependencyInjection/Container';
import BuyingListContainer from '../../BuyingList/DependencyInjection/Container';

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
      BuyingListContainer.adapter
    );
  }
}

const Container: PrimaryInputContainer = new PrimaryInputContainer();
export default Container;
