import Container, {NavigationContainer} from './Container';
import NavigationAdapter from '../NavigationAdapter';
import NavigationController from '../NavigationController';

describe(NavigationContainer, function () {
  it('should provide the controller', function () {
    expect(Container.controller).toBeInstanceOf(NavigationController);
  });

  it('should provide the adapter', function () {
    expect(Container.adapter).toBeInstanceOf(NavigationAdapter);
  });
});
