import ListInteractor from '../BuyingList/ListInteractor';
import SaveInputValueInteractor, {Request as SaveValueRequest} from './SaveInputValueInteractor';
import LoadInteractor, {LoadResponse} from './LoadInteractor';
import RemoveInteractor from './RemoveInteractor';
import Controller from '../Controller';
import PrimaryInputAdapter from './PrimaryInputAdapter';
import BuyingListAdapter from '../BuyingList/BuyingListAdapter';
import RootView from '../RootView';
import Presenter from './Presenter';
import NavigationAdapter from '../Navigation/NavigationAdapter';

export default class PrimaryInputController implements Controller {
    private viewInstance?: RootView;

    constructor(
        private adapter: PrimaryInputAdapter,
        private addEntryInteractor: ListInteractor,
        private saveInputValueInteractor: SaveInputValueInteractor,
        private loadInteractor: LoadInteractor,
        private presenter: Presenter,
        private entireListControllerAdapter: BuyingListAdapter,
        private removeInteractor: RemoveInteractor,
        private navigationAdapter: NavigationAdapter
    ) {
    }

    private get view(): RootView {
        return this.viewInstance as RootView;
    }

    public attach(view: RootView): void {
        this.viewInstance = view;
        this.bindAdapter();
        this.actualizeOutput();
    }

    private bindAdapter(): void {
        this.adapter.onSubmit = this.saveEntry.bind(this);
        this.adapter.onInputChange = this.saveInputValue.bind(this);
        this.adapter.refresh = this.actualizeOutput.bind(this);
        this.adapter.onDelete = this.deleteEntry.bind(this);
        this.adapter.onDiscard = this.discardInput.bind(this);
    }

    private actualizeOutput() {
        const response: LoadResponse = this.loadInteractor.loadData();
        this.view.model = this.presenter.present(response);
    }

    private saveEntry(): void {
        this.addEntryInteractor.saveEntry();
        this.actualizeOutputAndBuyingList();
        this.navigationAdapter.refresh();
    }

    private actualizeOutputAndBuyingList() {
        this.actualizeOutput();
        this.entireListControllerAdapter.refresh();
    }

    private saveInputValue(newValue: string): void {
        const request: SaveValueRequest = new SaveValueRequest();
        request.newInputValue = newValue;
        this.saveInputValueInteractor.updateInputValue(request);
        this.actualizeOutput();
        this.entireListControllerAdapter.onFormInput();
    }

    private deleteEntry(): void {
        this.removeInteractor.deleteEntry();
        this.actualizeOutputAndBuyingList();
        this.navigationAdapter.refresh();
    }

    private discardInput(): void {
        this.removeInteractor.discardInput();
        this.actualizeOutputAndBuyingList();
    }
}
