import ShoppingListPresenter from './ShoppingListPresenter';
import Pages from 'Core/ShoppingList/Pages';
import ShoppingListModel from './ShoppingListModel';
import PageStateResponseModel from 'Core/ShoppingList/ActivePageUseCase/PageStateResponse/PageStateResponseModel';

describe('ShoppingListPresenter', function (): void {
    let presenter: ShoppingListPresenter;

    beforeEach(function (): void {
        presenter = new ShoppingListPresenter();
    });

    it('should return correct view model when active page is list', async function (): Promise<void> {
        const state: PageStateResponseModel = new PageStateResponseModel();
        state.activePage = Pages.LIST;

        const model: ShoppingListModel = presenter.present(state);

        expect(model.showBuyingList).toBe(true);
        expect(model.showSetting).toBe(false);
    });

    it('should return correct view model when active page is setting', async function (): Promise<void> {
        const state: PageStateResponseModel = new PageStateResponseModel();
        state.activePage = Pages.SETTING;

        const model: ShoppingListModel = presenter.present(state);

        expect(model.showBuyingList).toBe(false);
        expect(model.showSetting).toBe(true);
    });
});
