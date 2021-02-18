import EntireListController from './EntireListController';
import EntireList from './EntireList';
import EntireListModel from './EntireListModel';
import EntryModel from './EntryModel';
import EntireListPresenter from './EntireListPresenter';
import EntireListInteractor, {Response} from './EntireListInteractor';
import EntryEntity from './EntryEntity';

describe(EntireListController, function () {
  let view: EntireList, controller: EntireListController, entireListPresenter: EntireListPresenter,
    entireListInteractor: EntireListInteractor;

  beforeEach(function () {
    view = {model: null} as unknown as EntireList;
    entireListPresenter = {presentLoadResponse: jest.fn()} as unknown as EntireListPresenter;
    entireListInteractor = {loadEntireList: jest.fn()} as unknown as EntireListInteractor;
    controller = new EntireListController(entireListPresenter, entireListInteractor);
  });

  it('should control the display of current list', function () {
    const entry: EntryModel = new EntryModel();
    entry.id = 'test::id:';
    const model: EntireListModel = new EntireListModel();
    model.list = [entry];
    const entryEntity: EntryEntity = new EntryEntity();
    entryEntity.id = 'test::id:';
    const response: Response = new Response();
    response.entireList = [entryEntity];

    (entireListInteractor.loadEntireList as jest.Mock).mockReturnValueOnce(response);
    (entireListPresenter.presentLoadResponse as jest.Mock).mockReturnValueOnce(model);

    controller.attach(view);

    expect(entireListInteractor.loadEntireList).toBeCalledWith();
    expect(entireListPresenter.presentLoadResponse).toBeCalledWith(response);
    expect(view.model).toBe(model);
  });
});
