import PrimaryInputModel from './PrimaryInputModel';
import {LoadResponse} from '../LoadInteractor';
import EntryEntity from '../../BuyingList/ListStorage/EntryEntity';
import {SystemTabs} from '../../Navigation/TabEntity';

export default class PrimaryInputPresenter {
  private static compareEntries(inputValue: string) {
    return (e: EntryEntity): boolean => e.name.trim().toLowerCase() == inputValue.trim().toLowerCase();
  }

  public present(response: LoadResponse): PrimaryInputModel {
    const model: PrimaryInputModel = new PrimaryInputModel();
    const inputValue: string = response.inputValue.trimLeft();
    const showButtons: boolean = inputValue.length > 0;
    const foundInEntireList: boolean = response.entireList.filter(
      PrimaryInputPresenter.compareEntries(inputValue)
    ).length > 0;
    const foundInShoppingList: boolean = response.shoppingList.filter(
      PrimaryInputPresenter.compareEntries(inputValue)
    ).length > 0;

    model.inputValue = inputValue;
    model.showDiscardButton = showButtons;
    model.showSubmitButton =
      showButtons &&
      !foundInShoppingList &&
      (!foundInEntireList || response.currentTab == SystemTabs.ShoppingList)
    ;

    return model;
  }
}
