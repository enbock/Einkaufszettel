import Container, {BuyingListContainer} from './Container';
import BuyingListAdapter from '../BuyingListAdapter';
import BuyingListController from '../BuyingListController';

describe(BuyingListContainer, function () {
  it('should provide the adapter', function () {
    expect(Container.adapter).toBeInstanceOf(BuyingListAdapter);
  });

  it('should provide the controller', function () {
    expect(Container.controller).toBeInstanceOf(BuyingListController);
  });
});
