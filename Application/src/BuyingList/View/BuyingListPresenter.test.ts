import BuyingListPresenter from './BuyingListPresenter';
import {Response} from 'Core/BuyingList/BuyingListLoadUseCase/BuyingListLoadInteractor';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import BuyingListModel, {EntryModel} from './BuyingListModel';

describe('BuyingListPresente', function (): void {
    let presenter: BuyingListPresenter;

    beforeEach(function (): void {
        presenter = new BuyingListPresenter();
    });

    it('should present the load response as view model', async function (): Promise<void> {
        const entry: EntryEntity = new EntryEntity();
        entry.id = 'test::id:';
        entry.name = 'test::name:';
        const response: Response = new Response();
        response.activeList = [entry, entry];

        const expectedEntry: EntryModel = new EntryModel();
        expectedEntry.id = 'test::id:';
        expectedEntry.label = 'test::name:';
        const expectedModel: BuyingListModel = new BuyingListModel();
        expectedModel.list = [expectedEntry, expectedEntry];

        const result: BuyingListModel = presenter.presentLoadResponse(response);

        expect(result).toEqual(expectedModel);
    });
});
