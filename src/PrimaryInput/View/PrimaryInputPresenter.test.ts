import PrimaryInputPresenter from './PrimaryInputPresenter';
import PrimaryInputModel from './PrimaryInputModel';
import EntryEntity from '../../ListStorage/EntryEntity';
import {LoadResponse} from '../LoadInteractor';
import {SystemTabs} from '../../Navigation/TabEntity';

describe(PrimaryInputPresenter, function () {
    it('should present input data', function () {
        const response: LoadResponse = new LoadResponse();
        response.inputValue = 'test::value:';
        const expectedModel: PrimaryInputModel = new PrimaryInputModel();
        expectedModel.inputValue = 'test::value:';
        expectedModel.showSubmitButton = true;
        expectedModel.showDeleteButton = true;
        expectedModel.showDiscardButton = true;

        const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

        expect(result).toEqual(expectedModel);
    });

    it('should not show any button on empty input', function () {
        const response: LoadResponse = new LoadResponse();
        response.inputValue = '';
        const expectedModel: PrimaryInputModel = new PrimaryInputModel();
        expectedModel.inputValue = '';
        expectedModel.showSubmitButton = false;
        expectedModel.showDeleteButton = false;
        expectedModel.showDiscardButton = false;

        const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

        expect(result).toEqual(expectedModel);
    });

    it('should disable submit button, if text already in list', function () {
        const entry: EntryEntity = new EntryEntity();
        entry.name = ' test::inputValue: ';
        const response: LoadResponse = new LoadResponse();
        response.inputValue = 'test::inputValue:';
        response.entireList = [entry];

        const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

        expect(result.showSubmitButton).toBeFalsy();
    });

    it('should enable submit button, if text already in lists but on shopping list page', function () {
        const entry: EntryEntity = new EntryEntity();
        entry.name = ' test::inputValue: ';
        const response: LoadResponse = new LoadResponse();
        response.inputValue = 'test::inputValue:';
        response.entireList = [entry];
        response.currentTab = SystemTabs.ShoppingList;

        const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

        expect(result.showSubmitButton).toBeTruthy();
    });

    it('should disable submit button, if text already in shopping list', function () {
        const entry: EntryEntity = new EntryEntity();
        entry.name = ' test::inputValue: ';
        const response: LoadResponse = new LoadResponse();
        response.inputValue = 'test::inputValue:';
        response.shoppingList = [entry];
        response.currentTab = SystemTabs.EntireList;

        const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

        expect(result.showSubmitButton).toBeFalsy();
    });
});
