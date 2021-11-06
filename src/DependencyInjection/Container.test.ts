import Container, {GlobalContainer} from './Container';
import LocalStorage from '../ListStorage/LocalStorage/LocalStorage';
import NavigationMemory from '../Memory/SessionMemory';
import BuyingListAdapter from '../BuyingList/React/BuyingListAdapter';
import TemporaryMemory from '../FormMemory/TemporaryMemory';
import PrimaryInputAdapter from '../PrimaryInput/React/PrimaryInputAdapter';
import SelectionStorage from '../SelectionStorage/SessionStorage/SessionStorage';

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

  it('should provide the adapter', function () {
    expect(Container.inputAdapter).toBeInstanceOf(PrimaryInputAdapter);
  });

  it('should provide the selection storage', function () {
    expect(Container.selectionStorage).toBeInstanceOf(SelectionStorage);
  });
});
