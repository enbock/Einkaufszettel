import LoadInteractor, {LoadResponse} from './LoadInteractor';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import ListStorage from 'Core/BuyingList/ListStorage';
import {SystemTabs} from 'Core/Navigation/TabEntity';
import NavigationMemory from 'Core/Navigation/StateStorage';

describe('LoadInteractor', function (): void {
    let formMemory: Mocked<FormMemory>,
        interactor: LoadInteractor,
        listStorage: Mocked<ListStorage>,
        navigationMemory: Mocked<NavigationMemory>
    ;

    beforeEach(function (): void {
        formMemory = mock<FormMemory>();
        listStorage = mock<ListStorage>();
        navigationMemory = mock<NavigationMemory>();
        interactor = new LoadInteractor(formMemory, listStorage, navigationMemory);
    });

    it('should take input value from temporary memory', async function (): Promise<void> {
        const inputValue: string = 'test::inputValue:';
        const expectedResponse: LoadResponse = new LoadResponse();
        expectedResponse.inputValue = inputValue;
        expectedResponse.entireList = ['test::entire-list:' as any];
        expectedResponse.shoppingList = ['test::shopping-list:' as any];
        expectedResponse.currentTab = SystemTabs.ShoppingList;

        formMemory.readInputValue.and.returnValue(inputValue);
        listStorage.getEntireList.and.returnValue(['test::entire-list:' as any]);
        listStorage.getShoppingList.and.returnValue(['test::shopping-list:' as any]);
        navigationMemory.getActiveTab.and.returnValue(SystemTabs.ShoppingList);

        const result: LoadResponse = interactor.loadData();

        expect(formMemory.readInputValue).toHaveBeenCalled();
        expect(result).toEqual(expectedResponse);
    });
});
