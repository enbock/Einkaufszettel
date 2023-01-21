import Controller from './Controller';
import ActivePageInteractor from '../ActivePageInteractor/ActivePageInteractor';
import Presenter from '../Presenter';
import RootView from '../../RootView';
import Bus from './Bus';
import {mock} from 'jest-mock-extended';
import Pages from '../Pages';
import PageChangeRequestModel from '../ActivePageInteractor/PageChangeRequestModel';
import Mocked = jest.Mocked;

describe(Controller, function (): void {
    let controller: Controller;
    let activePageInteractor: Mocked<ActivePageInteractor>;
    let presenter: Mocked<Presenter>;
    let view: Mocked<RootView>;
    let bus: Mocked<Bus>;

    beforeEach(function (): void {
        activePageInteractor = mock<ActivePageInteractor>();
        presenter = mock<Presenter>();
        view = mock<RootView>();
        bus = mock<Bus>();
        controller = new Controller(activePageInteractor, presenter, bus);
        activePageInteractor.getPageState.mockReturnValue({
            activePage: 'test::page:' as MockedObject
        });
        presenter.present.mockReturnValue('test::model:');
    });

    it('should call presentData on attach', function (): void {
        controller.attach(view);
        expect(activePageInteractor.getPageState).toBeCalled();
        expect(presenter.present).toBeCalledWith({
            activePage: 'test::page:'
        });
        expect(view.model).toBe('test::model:');
    });

    it('should call handlePageSwitch on bus.handlePageSwitch', function (): void {
        bus.handlePageSwitch('test::newPage:' as Pages);
        expect(activePageInteractor.changeActivePage)
            .toBeCalledWith(new PageChangeRequestModel('test::newPage:' as Pages));
        expect(activePageInteractor.getPageState).toBeCalled();
    });
});
