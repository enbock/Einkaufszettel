import Controller from './Controller';
import ActivePageInteractor from 'Core/ShoppingList/ActivePageUseCase/ActivePageInteractor';
import Presenter from '../Presenter';
import RootView from '../../RootView';
import Bus from './Bus';
import Pages from 'Core/ShoppingList/Pages';
import PageChangeRequestModel from 'Core/ShoppingList/ActivePageUseCase/PageChangeRequestModel';

describe('Controller', function (): void {
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
        activePageInteractor.getPageState.and.returnValue({
            activePage: <Pages>'test::page:'
        });
        presenter.present.and.returnValue('test::model:');
    });

    it('should call presentData on attach', async function (): Promise<void> {
        controller.attach(view);
        expect(activePageInteractor.getPageState).toHaveBeenCalled();
        expect(presenter.present).toHaveBeenCalledWith({
            activePage: <Pages>'test::page:'
        });
        expect(view.model).toBe('test::model:');
    });

    it('should call handlePageSwitch on bus.handlePageSwitch', async function (): Promise<void> {
        await bus.handlePageSwitch('test::newPage:' as Pages);
        expect(activePageInteractor.changeActivePage)
            .toHaveBeenCalledWith(new PageChangeRequestModel('test::newPage:' as Pages));
        expect(activePageInteractor.getPageState).toHaveBeenCalled();
    });
});
