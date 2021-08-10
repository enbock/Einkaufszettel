import BuyingListController, {Adapter} from './BuyingListController';
import BuyingList from './BuyingList';
import BuyingListModel from './BuyingListModel';
import EntryModel from './EntryModel';
import BuyingListPresenter from './BuyingListPresenter';
import BuyingListLoadInteractor, {Response} from '../BuyingListLoadInteractor';
import EntryEntity from '../ListStorage/EntryEntity';
import {mock, MockProxy} from 'jest-mock-extended';

describe(BuyingListController, function () {
  let view: BuyingList & MockProxy<BuyingList>,
    controller: BuyingListController,
    entireListPresenter: BuyingListPresenter & MockProxy<BuyingListPresenter>,
    entireListInteractor: BuyingListLoadInteractor & MockProxy<BuyingListLoadInteractor>,
    adapter: Adapter
  ;

  beforeEach(function () {
    view = mock<BuyingList>();
    entireListPresenter = mock<BuyingListPresenter>();
    entireListInteractor = mock<BuyingListLoadInteractor>();
    adapter = mock<Adapter>();
    controller = new BuyingListController(entireListPresenter, entireListInteractor, adapter);
  });

  function prepareAttachAndData() {
    const entry: EntryModel = new EntryModel();
    entry.id = 'test::id:';
    const model: BuyingListModel = new BuyingListModel();
    model.list = [entry];
    const entryEntity: EntryEntity = new EntryEntity();
    entryEntity.id = 'test::id:';
    const response: Response = new Response();
    response.activeList = [entryEntity];

    entireListInteractor.loadActiveList.mockReturnValueOnce(response);
    entireListPresenter.presentLoadResponse.mockReturnValueOnce(model);
    return {model, response};
  }

  it('should control the display of current list', function () {
    const {model, response} = prepareAttachAndData();

    controller.attach(view);

    expect(entireListInteractor.loadActiveList).toBeCalled();
    expect(entireListPresenter.presentLoadResponse).toBeCalledWith(response);
    expect(view.model).toBe(model);
  });

  it('should load list on adapter call', function () {
    const {model, response} = prepareAttachAndData();
    controller.attach(view);

    entireListInteractor.loadActiveList.mockReturnValueOnce(response);
    entireListPresenter.presentLoadResponse.mockReturnValueOnce(model);

    adapter.onListChange();

    expect(entireListInteractor.loadActiveList).toBeCalledTimes(2);
    expect(entireListPresenter.presentLoadResponse).toBeCalledWith(response);
    expect(entireListPresenter.presentLoadResponse).toBeCalledTimes(2);
    expect(view.model).toBe(model);
  });

  it('should should not load list of not attached to view', function () {
    adapter.onListChange();

    expect(entireListInteractor.loadActiveList).not.toBeCalled();
  });
});
