import {Adapter} from '../PrimaryInput';
import PrimaryInputAdapter from '../PrimaryInputAdapter';
import PrimaryInputController from '../PrimaryInputController';
import AddEntryInteractor from '../AddEntryInteractor';
import SaveInputValueInteractor from '../SaveInputValueInteractor';
import GetInputValueInteractor from '../GetInputValueInteractor';
import PrimaryInputPresenter from '../PrimaryInputPresenter';

export class PrimaryInputContainer {
  public adapter: Adapter = new PrimaryInputAdapter();
  public controller: PrimaryInputController;

  constructor() {
    this.controller = new PrimaryInputController(
      this.adapter,
      new AddEntryInteractor(),
      new SaveInputValueInteractor(
        {
          readInputValue(): string {
            // TODO EKZ-61 Implement persisting
            return '';
          },
          storeInputValue(inputValue: string): void {
            // TODO EKZ-61 Implement persisting
          }
        }
      ),
      new GetInputValueInteractor(),
      new PrimaryInputPresenter()
    );
  }
}

const Container: PrimaryInputContainer = new PrimaryInputContainer();
export default Container;
