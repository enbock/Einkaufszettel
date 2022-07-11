import NavigationPresenter from './NavigationPresenter';
import TabModel from './TabModel';
import NavigationModel from '../NavigationModel';
import {LoadResponse} from '../NavigationInteractor';
import TabEntity, {SystemTabs} from '../TabEntity';

describe(NavigationPresenter, function () {
    let presenter: NavigationPresenter;

    beforeEach(function () {
        presenter = new NavigationPresenter();
    });

    it('should present current tab data to view', function () {
        const entireListEntity: TabEntity = new TabEntity();
        entireListEntity.name = SystemTabs.EntireList;
        const shoppingListEntity: TabEntity = new TabEntity();
        shoppingListEntity.name = SystemTabs.ShoppingList;
        const response: LoadResponse = {
            activateTab: SystemTabs.EntireList,
            hasUndoAvailable: false,
            tabs: [entireListEntity, shoppingListEntity]
        };

        const result: NavigationModel = presenter.present(response);

        const entireListTab: TabModel = new TabModel();
        entireListTab.isActive = true;
        entireListTab.name = SystemTabs.EntireList;
        entireListTab.label = NavigationModel.i18n.entireListLabel;
        const shoppingListTab: TabModel = new TabModel();
        shoppingListTab.isActive = false;
        shoppingListTab.name = SystemTabs.ShoppingList;
        shoppingListTab.label = NavigationModel.i18n.shoppingListLabel;

        expect(result.navigationTabs).toEqual([entireListTab, shoppingListTab]);
    });

    it('should present undo visualisation', async function () {
        const response: LoadResponse = {
            activateTab: '',
            hasUndoAvailable: true,
            tabs: []
        };

        const result: NavigationModel = presenter.present(response);

        expect(result.undoEnabled).toBeTruthy();
    });
});
