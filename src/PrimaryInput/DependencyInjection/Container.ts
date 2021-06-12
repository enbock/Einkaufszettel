import {Adapter} from '../PrimaryInput';
import PrimaryInputAdapter from '../PrimaryInputAdapter';
import PrimaryInputController from '../PrimaryInputController';
import AddEntryInteractor from '../AddEntryInteractor';
import SaveInputValueInteractor from '../SaveInputValueInteractor';
import GetInputValueInteractor from '../GetInputValueInteractor';
import PrimaryInputPresenter from '../PrimaryInputPresenter';
import TemporaryMemory from '../FormMemory/TemporaryMemory';
import GlobalContainer from '../../DependencyInjection/Container';
import BuyingListContainer from '../../BuyingList/DependencyInjection/Container';
import {v4 as UuidVersion4} from 'uuid';
import UuidGenerator from '../UniqueIdentifierGenerator/UuidGenerator';
import FormMemory from '../FormMemory/FormMemory';

export class PrimaryInputContainer {
  public adapter: Adapter = new PrimaryInputAdapter();
  public controller: PrimaryInputController;

  constructor() {
    const temporaryMemory: FormMemory = new TemporaryMemory();
    this.controller = new PrimaryInputController(
      this.adapter,
      new AddEntryInteractor(
        GlobalContainer.listStorage,
        new UuidGenerator(UuidVersion4),
        temporaryMemory
      ),
      new SaveInputValueInteractor(temporaryMemory),
      new GetInputValueInteractor(temporaryMemory),
      new PrimaryInputPresenter(),
      BuyingListContainer.adapter
    );
  }
}

const Container: PrimaryInputContainer = new PrimaryInputContainer();
export default Container;
