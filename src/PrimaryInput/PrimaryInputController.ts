import PrimaryInput, {Adapter} from './PrimaryInput';
import AddEntryInteractor from './AddEntryInteractor';
import PrimaryInputPresenter, {PresentableResponse} from './PrimaryInputPresenter';
import SaveInputValueInteractor, {Request as SaveValueRequest} from './SaveInputValueInteractor';
import GetInputValueInteractor from './GetInputValueInteractor';
import {Adapter as EntireListControllerAdapter} from '../EntireList/EntireListController';

export default class PrimaryInputController {
  private readonly adapter: Adapter;
  private readonly addEntryInteractor: AddEntryInteractor;
  private readonly saveInputValueInteractor: SaveInputValueInteractor;
  private readonly getInputValueInteractor: GetInputValueInteractor;
  private readonly presenter: PrimaryInputPresenter;
  private readonly entireListControllerAdapter: EntireListControllerAdapter;
  private viewInstance: PrimaryInput | undefined;

  constructor(
    adapter: Adapter,
    addEntryInteractor: AddEntryInteractor,
    saveInputValueInteractor: SaveInputValueInteractor,
    getInputValueInteractor: GetInputValueInteractor,
    presenter: PrimaryInputPresenter,
    entireListAdapter: EntireListControllerAdapter
  ) {
    this.adapter = adapter;
    this.addEntryInteractor = addEntryInteractor;
    this.saveInputValueInteractor = saveInputValueInteractor;
    this.getInputValueInteractor = getInputValueInteractor;
    this.presenter = presenter;
    this.entireListControllerAdapter = entireListAdapter;
  }

  private get view(): PrimaryInput {
    return this.viewInstance as PrimaryInput;
  }

  attach(view: PrimaryInput): void {
    this.viewInstance = view;
    this.bindAdapter();
    this.getCurrentInputValue();
  }

  private getCurrentInputValue(): void {
    const response: PresentableResponse = this.getInputValueInteractor.getInputValue();
    this.actualizeOutput(response);
  }

  private actualizeOutput(response: PresentableResponse) {
    this.view.model = this.presenter.present(response);
  }

  private bindAdapter(): void {
    this.adapter.onSubmit = this.addNewEntry.bind(this);
    this.adapter.onInputChange = this.saveInputValue.bind(this);
  }

  private addNewEntry(): void {
    const response: PresentableResponse = this.addEntryInteractor.addNewEntry();
    this.actualizeOutput(response);
    this.entireListControllerAdapter.onListChange();
  }

  private saveInputValue(newValue: string): void {
    const request: SaveValueRequest = new SaveValueRequest();
    request.newInputValue = newValue;
    const response: PresentableResponse = this.saveInputValueInteractor.saveInputValue(request);
    this.actualizeOutput(response);
  }
}
