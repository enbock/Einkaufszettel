import Container, {GlobalContainer} from './Container';
import LocalStorage from '../BuyingList/ListStorage/LocalStorage/LocalStorage';
import NavigationMemory from '../Navigation/Memory/SessionMemory';
import BuyingListAdapter from '../BuyingList/React/BuyingListAdapter';
import TemporaryMemory from '../PrimaryInput/FormMemory/TemporaryMemory';

describe(GlobalContainer, function () {
  it('should global provide the list store', function () {
    expect(Container.listStorage).toBeInstanceOf(LocalStorage);
  });

  it('should provide global store of selected tab', function () {
    expect(Container.navigationMemory).toBeInstanceOf(NavigationMemory);
  });

  it('should provide the list adapter', function () {
    expect(Container.listAdapter).toBeInstanceOf(BuyingListAdapter);
  });

  it('should provide the form memory', function () {
    expect(Container.formMemory).toBeInstanceOf(TemporaryMemory);
  });
});
