import ApplicationStorage from '../ApplicationStorage';
import Pages from 'Core/ShoppingList/Pages';
import ResponseFormatter from './PageStateResponse/ResponseFormatter';
import PageStateResponse from './PageStateResponse/PageStateResponse';
import PageChangeRequest from './PageChangeRequest';

export default class ActivePageInteractor {
    constructor(
        private applicationStorage: ApplicationStorage,
        private responseFormatter: ResponseFormatter
    ) {
    }

    public changeActivePage(request: PageChangeRequest): void {
        let activePage: Pages = this.applicationStorage.getActivePage();
        if (request.page == activePage && activePage == Pages.SETTING) activePage = Pages.LIST;
        else activePage = request.page;
        this.applicationStorage.setActivePage(activePage);
    }

    public getPageState(): PageStateResponse {
        const activePage: Pages = this.applicationStorage.getActivePage();
        return this.responseFormatter.formatPageStateResponse(activePage);
    }
}
