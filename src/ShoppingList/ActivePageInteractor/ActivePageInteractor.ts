import ApplicationStorage from '../ApplicationStorage/ApplicationStorage';
import Pages from '../Pages';
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
        this.applicationStorage.setActivePage(request.page);
    }

    public getPageState(): PageStateResponse {
        const activePage: Pages = this.applicationStorage.getActivePage();
        return this.responseFormatter.formatPageStateResponse(activePage);
    }
}
