import TabModel from './View/TabModel';
import {SystemTabs} from './TabEntity';

interface I18n {
    entireListLabel: string,
    shoppingListLabel: string
}

interface TabLabelMap {
    [tabId: string]: string;
}

export default class NavigationModel {
    public static i18n: I18n = {
        entireListLabel: 'Gesamtliste',
        shoppingListLabel: 'Einkaufszettel'
    };
    public static tabLabelMap: TabLabelMap = {
        [SystemTabs.EntireList]: NavigationModel.i18n.entireListLabel,
        [SystemTabs.ShoppingList]: NavigationModel.i18n.shoppingListLabel
    };
    public navigationTabs: TabModel[] = [];
    public undoEnabled: boolean = false;
}
