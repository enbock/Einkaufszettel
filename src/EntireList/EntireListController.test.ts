import EntireListController, {Adapter} from './EntireListController';
import EntireList from './EntireList';
import EntireListModel from './EntireListModel';
import EntryModel from './EntryModel';
import EntireListPresenter from './EntireListPresenter';
import EntireListLoadInteractor, {Response} from './EntireListLoadInteractor';
import EntryEntity from './ListStorage/EntryEntity';

describe(EntireListController, function () {
  let view: EntireList,
    controller: EntireListController,
    entireListPresenter: EntireListPresenter,
    entireListInteractor: EntireListLoadInteractor,
    adapter: Adapter
  ;

  beforeEach(function () {
    view = {model: null} as unknown as EntireList;
    entireListPresenter = {presentLoadResponse: jest.fn()} as unknown as EntireListPresenter;
    entireListInteractor = {loadEntireList: jest.fn()} as unknown as EntireListLoadInteractor;
    adapter = {onListChange: jest.fn()};
    controller = new EntireListController(entireListPresenter, entireListInteractor, adapter);
  });

  function prepareAttachAndData() {
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
    return {model, response};
  }

  it('should control the display of current list', function () {
    const {model, response} = prepareAttachAndData();

    controller.attach(view);

    expect(entireListInteractor.loadEntireList).toBeCalled();
    expect(entireListPresenter.presentLoadResponse).toBeCalledWith(response);
    expect(view.model).toBe(model);
  });

  it('should load list on adapter call', function () {
    const {model, response} = prepareAttachAndData();
    controller.attach(view);

    (entireListInteractor.loadEntireList as jest.Mock).mockReturnValueOnce(response);
    (entireListPresenter.presentLoadResponse as jest.Mock).mockReturnValueOnce(model);

    adapter.onListChange();

    expect(entireListInteractor.loadEntireList).toBeCalledTimes(2);
    expect(entireListPresenter.presentLoadResponse).toBeCalledWith(response);
    expect(entireListPresenter.presentLoadResponse).toBeCalledTimes(2);
    expect(view.model).toBe(model);
  });

  it('should should not load list of not attached to view', function () {
    adapter.onListChange();

    expect(entireListInteractor.loadEntireList).not.toBeCalled();
  });
});
