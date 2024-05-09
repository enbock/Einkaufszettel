import {LoadResponse} from 'Core/Navigation/UseCase/NavigationInteractor';
import NavigationModel from './NavigationModel';
import TabModel from './TabModel';
import TabEntity from 'Core/Navigation/TabEntity';
import Presenter from '../Presenter';

export default class NavigationPresenter implements Presenter {
    private response: LoadResponse = {activateTab: '', hasUndoAvailable: false, tabs: []};

    public present(response: LoadResponse): NavigationModel {
        this.response = response;
        const model: NavigationModel = new NavigationModel();

        model.navigationTabs = this.response.tabs.map(this.presentTab.bind(this));
        model.undoEnabled = response.hasUndoAvailable == true;

        return model;
    }

    private presentTab(entity: TabEntity): TabModel {
        const model: TabModel = new TabModel();

        model.isActive = entity.name === this.response.activateTab;
        model.name = entity.name;
        model.label = NavigationModel.tabLabelMap[entity.name];

        return model;
    }
}
