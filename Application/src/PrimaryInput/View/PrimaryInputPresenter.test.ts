import PrimaryInputPresenter from './PrimaryInputPresenter';
import PrimaryInputModel from './PrimaryInputModel';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {LoadResponse} from 'Core/PrimaryInput/UseCase/LoadInteractor';
import {SystemTabs} from 'Core/Navigation/TabEntity';

describe('PrimaryInputPresente', function (): void {
    it('should present input data', async function (): Promise<void> {
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

    it('should not show any button on empty input', async function (): Promise<void> {
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

    it('should disable submit button, if text already in list', async function (): Promise<void> {
        const entry: EntryEntity = new EntryEntity();
        entry.name = ' test::inputValue: ';
        const response: LoadResponse = new LoadResponse();
        response.inputValue = 'test::inputValue:';
        response.entireList = [entry];

        const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

        expect(result.showSubmitButton).toBeFalsy();
    });

    it('should enable submit button, if text already in lists but on shopping list page',
        async function (): Promise<void> {
            const entry: EntryEntity = new EntryEntity();
            entry.name = ' test::inputValue: ';
            const response: LoadResponse = new LoadResponse();
            response.inputValue = 'test::inputValue:';
            response.entireList = [entry];
            response.currentTab = SystemTabs.ShoppingList;

            const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

            expect(result.showSubmitButton).toBeTruthy();
        });

    it('should disable submit button, if text already in shopping list', async function (): Promise<void> {
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
