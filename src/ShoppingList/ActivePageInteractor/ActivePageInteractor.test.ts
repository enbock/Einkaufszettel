import ActivePageInteractor from './ActivePageInteractor';
import {mock} from 'jest-mock-extended';
import ApplicationStorage from '../ApplicationStorage/ApplicationStorage';
import Pages from '../Pages';
import ResponseFormatter from './PageStateResponse/ResponseFormatter';
import PageChangeRequest from './PageChangeRequest';
import PageStateResponse from './PageStateResponse/PageStateResponse';
import Mocked = jest.Mocked;

describe(ActivePageInteractor, function (): void {
    let applicationStorage: Mocked<ApplicationStorage>;
    let responseFormatter: Mocked<ResponseFormatter>;
    let interactor: ActivePageInteractor;

    beforeEach(function (): void {
        applicationStorage = mock<ApplicationStorage>();
        responseFormatter = mock<ResponseFormatter>();
        interactor = new ActivePageInteractor(applicationStorage, responseFormatter);
    });

    it('should change the active page', function (): void {
        const request: PageChangeRequest = {page: 'test::page:' as MockedObject};
        interactor.changeActivePage(request);

        expect(applicationStorage.setActivePage).toBeCalledWith('test::page:' as MockedObject);
    });

    it('should get the page state', function (): void {
        const activePage: Pages = 'test::page:' as MockedObject;
        const response: PageStateResponse = {activePage: 'test::page:' as MockedObject};
        applicationStorage.getActivePage.mockReturnValue(activePage);
        responseFormatter.formatPageStateResponse.mockReturnValue(response);

        const result: PageStateResponse = interactor.getPageState();

        expect(applicationStorage.getActivePage).toBeCalled();
        expect(responseFormatter.formatPageStateResponse).toBeCalledWith(activePage);
        expect(result).toEqual(response);
    });
});
