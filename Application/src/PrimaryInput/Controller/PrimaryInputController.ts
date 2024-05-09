import ListUseCase from 'Core/BuyingList/ListUseCase/ListUseCase';
import SaveInputValueInteractor, {
    Request as SaveValueRequest
} from 'Core/PrimaryInput/InputValueUseCase/SaveInputValueInteractor';
import LoadInteractor, {LoadResponse} from 'Core/PrimaryInput/UseCase/LoadInteractor';
import RemoveInteractor from 'Core/PrimaryInput/RemoveUseCase/RemoveInteractor';
import ViewAttachedController from '../../ViewAttachedController';
import PrimaryInputAdapter from '../PrimaryInputAdapter';
import BuyingListAdapter from '../../BuyingList/BuyingListAdapter';
import RootView from '../../RootView';
import Presenter from '../Presenter';
import NavigationAdapter from '../../Navigation/NavigationAdapter';

export default class PrimaryInputController implements ViewAttachedController {
    private viewInstance?: RootView;

    constructor(
        private adapter: PrimaryInputAdapter,
        private addEntryInteractor: ListUseCase,
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

    public async attach(view: RootView): Promise<void> {
        this.viewInstance = view;
        this.bindAdapter();
        await this.actualizeOutput();
    }

    private bindAdapter(): void {
        this.adapter.onSubmit = this.saveEntry.bind(this);
        this.adapter.onInputChange = this.saveInputValue.bind(this);
        this.adapter.refresh = this.actualizeOutput.bind(this);
        this.adapter.onDelete = this.deleteEntry.bind(this);
        this.adapter.onDiscard = this.discardInput.bind(this);
    }

    private async actualizeOutput() {
        const response: LoadResponse = this.loadInteractor.loadData();
        this.view.model = this.presenter.present(response);
    }

    private async saveEntry(): Promise<void> {
        this.addEntryInteractor.saveEntry();
        await this.actualizeOutputAndBuyingList();
        await this.navigationAdapter.refresh();
    }

    private async actualizeOutputAndBuyingList() {
        await this.actualizeOutput();
        await this.entireListControllerAdapter.refresh();
    }

    private async saveInputValue(newValue: string): Promise<void> {
        const request: SaveValueRequest = new SaveValueRequest();
        request.newInputValue = newValue;
        this.saveInputValueInteractor.updateInputValue(request);
        this.actualizeOutput();
        await this.entireListControllerAdapter.onFormInput();
    }

    private async deleteEntry(): Promise<void> {
        this.removeInteractor.deleteEntry();
        await this.actualizeOutputAndBuyingList();
        await this.navigationAdapter.refresh();
    }

    private async discardInput(): Promise<void> {
        this.removeInteractor.discardInput();
        await this.actualizeOutputAndBuyingList();
    }
}
