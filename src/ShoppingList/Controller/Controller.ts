import ViewAttachedController from '../../ViewAttachedController';
import RootView from '../../RootView';
import ActivePageInteractor from '../ActivePageInteractor/ActivePageInteractor';
import Presenter from '../Presenter';
import PageStateResponse from '../ActivePageInteractor/PageStateResponse/PageStateResponse';
import Bus from './Bus';
import Pages from '../Pages';
import PageChangeRequestModel from '../ActivePageInteractor/PageChangeRequestModel';

export default class Controller implements ViewAttachedController {
    private view?: RootView;

    constructor(
        private activePageInteractor: ActivePageInteractor,
        private presenter: Presenter,
        private bus: Bus
    ) {
        this.bus.handlePageSwitch = this.handlePageSwitch.bind(this);
    }

    public attach(view: RootView): void {
        this.view = view;
        this.presentData();
    }

    private presentData(): void {
        const response: PageStateResponse = this.activePageInteractor.getPageState();
        if (this.view) this.view.model = this.presenter.present(response);
    }

    private handlePageSwitch(page: Pages): void {
        this.activePageInteractor.changeActivePage(new PageChangeRequestModel(page));
        this.presentData();
    }
}
