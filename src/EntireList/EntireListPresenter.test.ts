import EntireListPresenter from './EntireListPresenter';
import {Response} from './EntireListLoadInteractor';
import EntryEntity from './ListStorage/EntryEntity';
import EntireListModel from './EntireListModel';
import EntryModel from './EntryModel';

describe(EntireListPresenter, function () {
  let presenter: EntireListPresenter;

  beforeEach(function () {
    presenter = new EntireListPresenter();
  });

  it('should present the load response as view model', function () {
    const entry: EntryEntity = new EntryEntity();
    entry.id = 'test::id:';
    entry.name = 'test::name:';
    const response: Response = new Response();
    response.entireList = [entry, entry];

    const expectedEntry: EntryModel = new EntryModel();
    expectedEntry.id = 'test::id:';
    expectedEntry.label = 'test::name:';
    const expectedModel: EntireListModel = new EntireListModel();
    expectedModel.list = [expectedEntry, expectedEntry];

    const result: EntireListModel = presenter.presentLoadResponse(response);

    expect(result).toEqual(expectedModel);
  });
});
