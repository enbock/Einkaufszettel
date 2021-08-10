import Container, {NavigationContainer} from './Container';
import NavigationAdapter from '../React/NavigationAdapter';
import NavigationController from '../React/NavigationController';

describe(NavigationContainer, function () {
  it('should provide the controller', function () {
    expect(Container.controller).toBeInstanceOf(NavigationController);
  });

  it('should provide the adapter', function () {
    expect(Container.adapter).toBeInstanceOf(NavigationAdapter);
  });
});
