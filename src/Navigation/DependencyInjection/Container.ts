import NavigationAdapter from '../View/NavigationAdapter';
import NavigationController from '../View/NavigationController';
import NavigationInteractor from '../NavigationInteractor';
import NavigationPresenter from '../View/NavigationPresenter';
import ConfigLoader from '../Config/ConfigLoader';
import GlobalContainer from '../../DependencyInjection/Container';

export class Container {
    public adapter: NavigationAdapter = new NavigationAdapter();
    public controller: NavigationController = new NavigationController(
        new NavigationInteractor(GlobalContainer.navigationMemory, new ConfigLoader()),
        this.adapter,
        new NavigationPresenter(),
        GlobalContainer.listAdapter,
        GlobalContainer.primaryInputAdapter
    );
}

const NavigationContainer: Container = new Container();
export default NavigationContainer;
