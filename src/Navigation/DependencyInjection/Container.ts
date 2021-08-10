import NavigationAdapter from '../React/NavigationAdapter';
import NavigationController from '../React/NavigationController';
import NavigationInteractor from '../NavigationInteractor';
import NavigationPresenter from '../React/NavigationPresenter';
import ConfigLoader from '../Config/ConfigLoader';
import GlobalContainer from '../../DependencyInjection/Container';

export class NavigationContainer {
  public adapter: NavigationAdapter = new NavigationAdapter();
  public controller: NavigationController = new NavigationController(
    new NavigationInteractor(GlobalContainer.navigationMemory, new ConfigLoader()),
    this.adapter,
    new NavigationPresenter(),
    GlobalContainer.listAdapter,
    GlobalContainer.inputAdapter
  );
}

const Container: NavigationContainer = new NavigationContainer();
export default Container;
