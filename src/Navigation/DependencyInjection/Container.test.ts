import Container, {NavigationContainer} from './Container';
import NavigationAdapter from '../NavigationAdapter';

describe(NavigationContainer, function () {
  it('should provide the controller', function () {
    expect(Container.controller).not.toBeUndefined();
  });

  it('should provide the adapter', function () {
    expect(Container.adapter).toBeInstanceOf(NavigationAdapter);
  });
});
