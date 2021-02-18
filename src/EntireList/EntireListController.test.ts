import EntireListController from './EntireListController';
import EntireList from './EntireList';
import EntireListModel from './EntireListModel';
import EntryModel from './EntryModel';
import EntireListPresenter from './EntireListPresenter';
import EntireListInteractor, {Response} from './EntireListInteractor';

describe(EntireListController, function () {
  let view: EntireList, controller: EntireListController, entireListPresenter: EntireListPresenter,
    entireListInteractor: EntireListInteractor;

  beforeEach(function () {
    view = {model: null} as unknown as EntireList;
    entireListPresenter = {presentList: jest.fn()};
    entireListInteractor = {loadEntireList: jest.fn()};
    controller = new EntireListController(entireListPresenter, entireListInteractor);
  });

  it('should control the display of current list', function () {
    const entry: EntryModel = new EntryModel();
    entry.id = 'test::id:';
    const model: EntireListModel = new EntireListModel();
    model.list = [entry];
    const response: Response = {response: 'data'} as Response;

    (entireListInteractor.loadEntireList as jest.Mock).mockReturnValueOnce(response);
    (entireListPresenter.presentList as jest.Mock).mockReturnValueOnce(model);

    controller.attach(view);

    expect(entireListInteractor.loadEntireList).toBeCalledWith();
    expect(entireListPresenter.presentList).toBeCalledWith(response);
    expect(view.model).toBe(model);
  });
});
