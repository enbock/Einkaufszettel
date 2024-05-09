import ActivePageInteractor from './ActivePageInteractor';
import ApplicationStorage from '../ApplicationStorage';
import Pages from 'Core/ShoppingList/Pages';
import ResponseFormatter from './PageStateResponse/ResponseFormatter';
import PageChangeRequest from './PageChangeRequest';
import PageStateResponse from './PageStateResponse/PageStateResponse';

describe('ActivePageInteractor', function (): void {
    let applicationStorage: Mocked<ApplicationStorage>;
    let responseFormatter: Mocked<ResponseFormatter>;
    let interactor: ActivePageInteractor;

    beforeEach(function (): void {
        applicationStorage = mock<ApplicationStorage>();
        responseFormatter = mock<ResponseFormatter>();
        interactor = new ActivePageInteractor(applicationStorage, responseFormatter);
    });

    it('should change the active page', async function (): Promise<void> {
        const request: PageChangeRequest = {page: 'test::page:' as MockedObject};
        interactor.changeActivePage(request);

        expect(applicationStorage.setActivePage).toHaveBeenCalledWith('test::page:' as MockedObject);
    });

    it('should change to buying list if setting already active', async function (): Promise<void> {
        applicationStorage.getActivePage.and.returnValue(Pages.SETTING);
        const request: PageChangeRequest = {page: Pages.SETTING};
        interactor.changeActivePage(request);

        expect(applicationStorage.setActivePage).toHaveBeenCalledWith(Pages.LIST);
    });

    it('should get the page state', async function (): Promise<void> {
        const activePage: Pages = 'test::page:' as MockedObject;
        const response: PageStateResponse = {activePage: 'test::page:' as MockedObject};
        applicationStorage.getActivePage.and.returnValue(activePage);
        responseFormatter.formatPageStateResponse.and.returnValue(response);

        const result: PageStateResponse = interactor.getPageState();

        expect(applicationStorage.getActivePage).toHaveBeenCalled();
        expect(responseFormatter.formatPageStateResponse).toHaveBeenCalledWith(activePage);
        expect(result).toEqual(response);
    });
});
