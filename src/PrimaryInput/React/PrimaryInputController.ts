import PrimaryInput, {Adapter as TemplateAdapter} from './PrimaryInput';
import AddEntryInteractor from '../AddEntryInteractor';
import PrimaryInputPresenter from './PrimaryInputPresenter';
import SaveInputValueInteractor, {Request as SaveValueRequest} from '../SaveInputValueInteractor';
import LoadInteractor, {LoadResponse as LoadResponse} from '../LoadInteractor';
import {Adapter as BuyingListAdapter} from '../../BuyingList/React/BuyingListController';

export interface Adapter extends TemplateAdapter {
  onListChange(): void;
}

export default class PrimaryInputController {
  private readonly adapter: Adapter;
  private readonly addEntryInteractor: AddEntryInteractor;
  private readonly saveInputValueInteractor: SaveInputValueInteractor;
  private readonly presenter: PrimaryInputPresenter;
  private readonly entireListControllerAdapter: BuyingListAdapter;
  private viewInstance: PrimaryInput | undefined;

  constructor(
    adapter: Adapter,
    addEntryInteractor: AddEntryInteractor,
    saveInputValueInteractor: SaveInputValueInteractor,
    private loadInteractor: LoadInteractor,
    presenter: PrimaryInputPresenter,
    entireListAdapter: BuyingListAdapter
  ) {
    this.adapter = adapter;
    this.addEntryInteractor = addEntryInteractor;
    this.saveInputValueInteractor = saveInputValueInteractor;
    this.presenter = presenter;
    this.entireListControllerAdapter = entireListAdapter;
  }

  private get view(): PrimaryInput {
    return this.viewInstance as PrimaryInput;
  }

  attach(view: PrimaryInput): void {
    this.viewInstance = view;
    this.bindAdapter();
    this.actualizeOutput();
  }

  private actualizeOutput() {
    const response: LoadResponse = this.loadInteractor.loadData();
    this.view.model = this.presenter.present(response);
  }

  private bindAdapter(): void {
    this.adapter.onSubmit = this.addNewEntry.bind(this);
    this.adapter.onInputChange = this.saveInputValue.bind(this);
    this.adapter.onListChange = this.actualizeOutput.bind(this);
  }

  private addNewEntry(): void {
    this.addEntryInteractor.addNewEntry();
    this.actualizeOutput();
    this.entireListControllerAdapter.onListChange();
  }

  private saveInputValue(newValue: string): void {
    const request: SaveValueRequest = new SaveValueRequest();
    request.newInputValue = newValue;
    this.saveInputValueInteractor.saveInputValue(request);
    this.actualizeOutput();
    this.entireListControllerAdapter.onFormInput();
  }
}
