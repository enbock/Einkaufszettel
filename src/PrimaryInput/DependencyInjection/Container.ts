import {Adapter} from '../React/PrimaryInput';
import PrimaryInputAdapter from '../React/PrimaryInputAdapter';
import PrimaryInputController from '../React/PrimaryInputController';
import AddEntryInteractor from '../AddEntryInteractor';
import SaveInputValueInteractor from '../SaveInputValueInteractor';
import GetInputValueInteractor from '../GetInputValueInteractor';
import PrimaryInputPresenter from '../React/PrimaryInputPresenter';
import GlobalContainer from '../../DependencyInjection/Container';
import BuyingListContainer from '../../BuyingList/DependencyInjection/Container';
import {v4 as UuidVersion4} from 'uuid';
import UuidGenerator from '../UniqueIdentifierGenerator/UuidGenerator';

export class PrimaryInputContainer {
  public adapter: Adapter = new PrimaryInputAdapter();
  public controller: PrimaryInputController;

  constructor() {
    this.controller = new PrimaryInputController(
      this.adapter,
      new AddEntryInteractor(
        GlobalContainer.listStorage,
        new UuidGenerator(UuidVersion4),
        GlobalContainer.formMemory
      ),
      new SaveInputValueInteractor(GlobalContainer.formMemory),
      new GetInputValueInteractor(GlobalContainer.formMemory),
      new PrimaryInputPresenter(),
      BuyingListContainer.adapter
    );
  }
}

const Container: PrimaryInputContainer = new PrimaryInputContainer();
export default Container;
