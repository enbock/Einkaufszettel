import PrimaryInput, {Adapter as TemplateAdapter} from './PrimaryInput';
import ListInteractor from '../../BuyingList/ListInteractor';
import PrimaryInputPresenter from './PrimaryInputPresenter';
import SaveInputValueInteractor, {Request as SaveValueRequest} from '../SaveInputValueInteractor';
import LoadInteractor, {LoadResponse} from '../LoadInteractor';
import {Adapter as BuyingListAdapter} from '../../BuyingList/View/BuyingListController';
import RemoveInteractor from '../RemoveInteractor';

export interface Adapter extends TemplateAdapter {
    onListChange(): void;
}

export default class PrimaryInputController {
    private viewInstance?: PrimaryInput;

    constructor(
        private adapter: Adapter,
        private addEntryInteractor: ListInteractor,
        private saveInputValueInteractor: SaveInputValueInteractor,
        private loadInteractor: LoadInteractor,
        private presenter: PrimaryInputPresenter,
        private entireListControllerAdapter: BuyingListAdapter,
        private removeInteractor: RemoveInteractor
    ) {
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
        this.adapter.onSubmit = this.saveEntry.bind(this);
        this.adapter.onInputChange = this.saveInputValue.bind(this);
        this.adapter.onListChange = this.actualizeOutput.bind(this);
        this.adapter.onDiscard = this.deleteOrDiscardEntry.bind(this);
    }

    private saveEntry(): void {
        this.addEntryInteractor.saveEntry();
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

    private deleteOrDiscardEntry(): void {
        this.removeInteractor.deleteOrDiscardEntry();
        this.actualizeOutput();
        this.entireListControllerAdapter.onListChange();
    }
}
