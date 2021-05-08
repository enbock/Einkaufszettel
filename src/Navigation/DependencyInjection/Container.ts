import NavigationAdapter from '../NavigationAdapter';
import NavigationController from '../NavigationController';
import NavigationInteractor from '../NavigationInteractor';
import NavigationPresenter from '../NavigationPresenter';

export class NavigationContainer {
  public adapter: NavigationAdapter = new NavigationAdapter();
  public controller: NavigationController = new NavigationController(
    new NavigationInteractor(),
    this.adapter,
    new NavigationPresenter()
  );
}

const Container: NavigationContainer = new NavigationContainer();
export default Container;
