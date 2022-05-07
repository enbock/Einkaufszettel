import {LoadResponse} from '../NavigationInteractor';
import NavigationModel from '../NavigationModel';
import TabModel from './TabModel';
import TabEntity from '../TabEntity';
import Presenter from '../Presenter';

export default class NavigationPresenter implements Presenter {
    private response: LoadResponse = new LoadResponse();

    public present(response: LoadResponse): NavigationModel {
        this.response = response;
        const model: NavigationModel = new NavigationModel();
        model.navigationTabs = this.response.tabs.map(this.presentTab.bind(this));
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
