import Container, {BuyingListContainer} from './Container';
import BuyingListAdapter from '../React/BuyingListAdapter';
import BuyingListController from '../React/BuyingListController';
import ListInteractor from '../ListInteractor';

describe(BuyingListContainer, function () {
  it('should provide the adapter', function () {
    expect(Container.adapter).toBeInstanceOf(BuyingListAdapter);
  });

  it('should provide the controller', function () {
    expect(Container.controller).toBeInstanceOf(BuyingListController);
  });

  it('should provide add entry interactor', function () {
    expect(Container.addEntryInteractor).toBeInstanceOf(ListInteractor);
  });
});
