import NavigationAdapter from '../NavigationAdapter';
import NavigationController from '../NavigationController';
import NavigationInteractor from '../NavigationInteractor';
import NavigationPresenter from '../NavigationPresenter';
import ConfigLoader from '../Config/ConfigLoader';
import SessionMemory from '../Memory/SessionMemory';

export class NavigationContainer {
  public adapter: NavigationAdapter = new NavigationAdapter();
  public controller: NavigationController = new NavigationController(
    new NavigationInteractor(new SessionMemory(window.sessionStorage), new ConfigLoader()),
    this.adapter,
    new NavigationPresenter()
  );
}

const Container: NavigationContainer = new NavigationContainer();
export default Container;
