import Container, {EntireListContainer} from './Container';
import EntireListAdapter from '../EntireListAdapter';

describe(EntireListContainer, function () {
  it('should provide the adapter', function () {
    expect(Container.adapter).toBeInstanceOf(EntireListAdapter);
  });

  it('should provide the controller', function () {
    expect(Container.controller).not.toBeUndefined();
  });
})
