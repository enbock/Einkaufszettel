import {LoadResponse} from '../NavigationInteractor';
import NavigationModel from '../NavigationModel';
import TabModel from './TabModel';
import TabEntity from '../TabEntity';

export default class NavigationPresenter {
  private static presentTab(entity: TabEntity, response: LoadResponse) {
    const model: TabModel = new TabModel();
    model.isActive = entity.name === response.activateTab;
    model.name = entity.name;
    model.label = NavigationModel.tabLabelMap[entity.name];

    return model;
  }

  public present(response: LoadResponse): NavigationModel {
    const model: NavigationModel = new NavigationModel();
    model.navigationTabs = response.tabs.map((e: TabEntity) => NavigationPresenter.presentTab(e, response));
    return model;
  }
}
