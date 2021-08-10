import PrimaryInputController from '../React/PrimaryInputController';
import AddEntryInteractor from '../AddEntryInteractor';
import SaveInputValueInteractor from '../SaveInputValueInteractor';
import LoadInteractor from '../LoadInteractor';
import PrimaryInputPresenter from '../React/PrimaryInputPresenter';
import GlobalContainer from '../../DependencyInjection/Container';
import BuyingListContainer from '../../BuyingList/DependencyInjection/Container';
import {v4 as UuidVersion4} from 'uuid';
import UuidGenerator from '../UniqueIdentifierGenerator/UuidGenerator';

export class PrimaryInputContainer {
  public controller: PrimaryInputController;

  constructor() {
    this.controller = new PrimaryInputController(
      GlobalContainer.inputAdapter,
      new AddEntryInteractor(
        GlobalContainer.listStorage,
        new UuidGenerator(UuidVersion4),
        GlobalContainer.formMemory,
        GlobalContainer.navigationMemory
      ),
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
