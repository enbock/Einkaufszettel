import Navigation from '../Navigation';
import NavigationAdapter from '../NavigationAdapter';

export class NavigationContainer {
  public controller: any = {
    attach: function (view: Navigation) {
      // TODO Controller
    }
  };
  public adapter: NavigationAdapter = new NavigationAdapter();
}

const Container: NavigationContainer = new NavigationContainer();
export default Container;
