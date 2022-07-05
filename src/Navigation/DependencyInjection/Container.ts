import NavigationController from '../NavigationController';
import NavigationInteractor from '../NavigationInteractor';
import NavigationPresenter from '../View/NavigationPresenter';
import ConfigLoader from '../Config/ConfigLoader';
import GlobalContainer from '../../DependencyInjection/Container';
import UndoContainer from '../../Undo/DependencyInjection/Container';

export class Container {
    public controller: NavigationController = new NavigationController(
        new NavigationInteractor(
            GlobalContainer.navigationMemory,
            new ConfigLoader(),
            UndoContainer.storage
        ),
        GlobalContainer.navigationAdapter,
        new NavigationPresenter(),
        GlobalContainer.listAdapter,
        GlobalContainer.primaryInputAdapter,
        UndoContainer.interactor
    );
}

const NavigationContainer: Container = new Container();
export default NavigationContainer;
