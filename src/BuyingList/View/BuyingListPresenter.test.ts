import BuyingListPresenter from './BuyingListPresenter';
import {Response} from '../BuyingListLoadInteractor';
import EntryEntity from '../../ListStorage/EntryEntity';
import BuyingListModel from './BuyingListModel';
import EntryModel from './EntryModel';

describe(BuyingListPresenter, function () {
  let presenter: BuyingListPresenter;

  beforeEach(function () {
    presenter = new BuyingListPresenter();
  });

  it('should present the load response as view model', function () {
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
