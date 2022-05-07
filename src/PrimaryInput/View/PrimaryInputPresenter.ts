import PrimaryInputModel from './PrimaryInputModel';
import {LoadResponse} from '../LoadInteractor';
import EntryEntity from '../../ListStorage/EntryEntity';
import {SystemTabs} from '../../Navigation/TabEntity';
import Presenter from '../Presenter';

export default class PrimaryInputPresenter implements Presenter {
    public present(response: LoadResponse): PrimaryInputModel {
        const model: PrimaryInputModel = new PrimaryInputModel();
        const inputValue: string = response.inputValue;
        const showButtons: boolean = inputValue.length > 0;
        const foundInEntireList: boolean = response.entireList.filter(
            this.compareEntries(inputValue)
        ).length > 0;
        const foundInShoppingList: boolean = response.shoppingList.filter(
            this.compareEntries(inputValue)
        ).length > 0;

        model.inputValue = inputValue;
        model.showDiscardButton = showButtons;
        model.showSubmitButton =
            showButtons &&
            !foundInShoppingList &&
            (!foundInEntireList || response.currentTab == SystemTabs.ShoppingList)
        ;
        model.discardLabel = response.currentTab == SystemTabs.EntireList ? model.i18n.delete : model.i18n.discard;

        return model;
    }

    private compareEntries(inputValue: string) {
        return (e: EntryEntity): boolean => e.name.trim() == inputValue.trim();
    }
}
