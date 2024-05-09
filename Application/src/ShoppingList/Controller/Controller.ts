import ViewAttachedController from '../../ViewAttachedController';
import RootView from '../../RootView';
import ActivePageInteractor from 'Core/ShoppingList/ActivePageUseCase/ActivePageInteractor';
import Presenter from '../Presenter';
import PageStateResponse from 'Core/ShoppingList/ActivePageUseCase/PageStateResponse/PageStateResponse';
import Bus from './Bus';
import Pages from 'Core/ShoppingList/Pages';
import PageChangeRequestModel from 'Core/ShoppingList/ActivePageUseCase/PageChangeRequestModel';

export default class Controller implements ViewAttachedController {
    private view?: RootView;

    constructor(
        private activePageInteractor: ActivePageInteractor,
        private presenter: Presenter,
        private bus: Bus
    ) {
        this.bus.handlePageSwitch = this.handlePageSwitch.bind(this);
    }

    public async attach(view: RootView): Promise<void> {
        this.view = view;
        this.presentData();
    }

    private presentData(): void {
        const response: PageStateResponse = this.activePageInteractor.getPageState();
        if (this.view) this.view.model = this.presenter.present(response);
    }

    private async handlePageSwitch(page: Pages): Promise<void> {
        this.activePageInteractor.changeActivePage(new PageChangeRequestModel(page));
        this.presentData();
    }
}
