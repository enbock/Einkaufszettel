import Container, {GlobalContainer} from './Container';
import LocalStorage from '../EntireList/ListStorage/LocalStorage/LocalStorage';

describe(GlobalContainer, function () {
  it('should global provide the list store', function () {
    expect(Container.listStorage).toBeInstanceOf(LocalStorage);
  });
});
