import NavigationAdapter from '../NavigationAdapter';
import NavigationController from '../NavigationController';
import NavigationInteractor from '../NavigationInteractor';
import NavigationPresenter from '../NavigationPresenter';
import ConfigLoader from '../Config/ConfigLoader';
import {TabId} from '../TabEntity';

export class NavigationContainer {
  public adapter: NavigationAdapter = new NavigationAdapter();
  public controller: NavigationController = new NavigationController(
    new NavigationInteractor({
      /** TODO implement API */
      getActiveTab(): TabId {
        return 'entireList';
      }, storeActiveTab(newTab: TabId): void {
      }
    }, new ConfigLoader()),
    this.adapter,
    new NavigationPresenter()
  );
}

const Container: NavigationContainer = new NavigationContainer();
export default Container;
