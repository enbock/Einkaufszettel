import PrimaryInputPresenter from './PrimaryInputPresenter';
import PrimaryInputModel from './PrimaryInputModel';
import EntryEntity from '../../ListStorage/EntryEntity';
import {LoadResponse} from '../LoadInteractor';
import {SystemTabs} from '../../Navigation/TabEntity';

describe(PrimaryInputPresenter, function () {
  it('should present input data', function () {
    const response: LoadResponse = new LoadResponse();
    response.inputValue = ' test::left-trimmed-value: ';
    const expectedModel: PrimaryInputModel = new PrimaryInputModel();
    expectedModel.inputValue = 'test::left-trimmed-value: ';
    expectedModel.showSubmitButton = true;
    expectedModel.showDiscardButton = true;
    expectedModel.discardLabel = expectedModel.i18n.discard;

    const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

    expect(result).toEqual(expectedModel);
  });

  it('should disable submit button, if text already in list', function () {
    const entry: EntryEntity = new EntryEntity();
    entry.name = ' test::inputValue: ';
    const response: LoadResponse = new LoadResponse();
    response.inputValue = 'test::inputValue:';
    response.entireList = [entry];
    const expectedModel: PrimaryInputModel = new PrimaryInputModel();
    expectedModel.inputValue = 'test::inputValue:';
    expectedModel.showSubmitButton = false;
    expectedModel.showDiscardButton = true;
    expectedModel.discardLabel = expectedModel.i18n.discard;

    const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

    expect(result).toEqual(expectedModel);
  });

  it('should enable submit button, if text already in lists but on shopping list page', function () {
    const entry: EntryEntity = new EntryEntity();
    entry.name = ' test::inputValue: ';
    const response: LoadResponse = new LoadResponse();
    response.inputValue = 'test::inputValue:';
    response.entireList = [entry];
    response.currentTab = SystemTabs.ShoppingList;
    const expectedModel: PrimaryInputModel = new PrimaryInputModel();
    expectedModel.inputValue = 'test::inputValue:';
    expectedModel.showSubmitButton = true;
    expectedModel.showDiscardButton = true;
    expectedModel.discardLabel = expectedModel.i18n.discard;

    const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

    expect(result).toEqual(expectedModel);
  });

  it('should disable submit button, if text already in shopping list', function () {
    const entry: EntryEntity = new EntryEntity();
    entry.name = ' test::inputValue: ';
    const response: LoadResponse = new LoadResponse();
    response.inputValue = 'test::inputValue:';
    response.shoppingList = [entry];
    response.currentTab = SystemTabs.EntireList;
    const expectedModel: PrimaryInputModel = new PrimaryInputModel();
    expectedModel.inputValue = 'test::inputValue:';
    expectedModel.showSubmitButton = false;
    expectedModel.showDiscardButton = true;
    expectedModel.discardLabel = expectedModel.i18n.delete;

    const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

    expect(result).toEqual(expectedModel);
  });
});
