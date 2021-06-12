import NavigationAdapter from '../NavigationAdapter';
import NavigationController from '../NavigationController';
import NavigationInteractor from '../NavigationInteractor';
import NavigationPresenter from '../NavigationPresenter';
import ConfigLoader from '../Config/ConfigLoader';
import GlobalContainer from '../../DependencyInjection/Container';

export class NavigationContainer {
  public adapter: NavigationAdapter = new NavigationAdapter();
  public controller: NavigationController = new NavigationController(
    new NavigationInteractor(GlobalContainer.navigationMemory, new ConfigLoader()),
    this.adapter,
    new NavigationPresenter(),
    GlobalContainer.listAdapter
  );
}

const Container: NavigationContainer = new NavigationContainer();
export default Container;
