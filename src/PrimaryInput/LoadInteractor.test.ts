import LoadInteractor, {LoadResponse} from './LoadInteractor';
import FormMemory from './FormMemory/FormMemory';
import {mock, MockProxy} from 'jest-mock-extended';
import ListStorage from '../BuyingList/ListStorage/ListStorage';
import {SystemTabs} from '../Navigation/TabEntity';
import NavigationMemory from '../Navigation/Memory/Memory';

describe(LoadInteractor, function () {
    let formMemory: MockProxy<FormMemory>,
        interactor: LoadInteractor,
        listStorage: ListStorage & MockProxy<ListStorage>,
        navigationMemory: NavigationMemory & MockProxy<NavigationMemory>
    ;

    beforeEach(function () {
        formMemory = mock<FormMemory>();
        listStorage = mock<ListStorage>();
        navigationMemory = mock<NavigationMemory>();
        interactor = new LoadInteractor(formMemory, listStorage, navigationMemory);
    });

    it('should take input value from temporary memory', function () {
        const inputValue: string = 'test::inputValue:';
        const expectedResponse: LoadResponse = new LoadResponse();
        expectedResponse.inputValue = inputValue;
        expectedResponse.entireList = ['test::entire-list:' as any];
        expectedResponse.shoppingList = ['test::shopping-list:' as any];
        expectedResponse.currentTab = SystemTabs.ShoppingList;

        formMemory.readInputValue.mockReturnValueOnce(inputValue);
        listStorage.getEntireList.mockReturnValueOnce(['test::entire-list:' as any]);
        listStorage.getShoppingList.mockReturnValueOnce(['test::shopping-list:' as any]);
        navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);

        const result: LoadResponse = interactor.loadData();

        expect(formMemory.readInputValue).toBeCalled();
        expect(result).toEqual(expectedResponse);
    });
});
