import LoadShoppingList from './LoadShoppingList';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {SystemTabs} from 'Core/Navigation/TabEntity';

describe('LoadShoppingList', function (): void {
    let task: LoadShoppingList,
        listStorage: Mocked<ListStorage>
    ;

    beforeEach(function (): void {
        listStorage = mock<ListStorage>();
        task = new LoadShoppingList(listStorage);
    });

    it('should can load shopping list', async function (): Promise<void> {
        listStorage.getShoppingList.and.returnValue([<MockedObject>'test::shopping-list:']);

        const actual: EntryEntity[] = task.loadList();

        expect(actual).toEqual([<MockedObject>'test::shopping-list:']);
    });

    it('should checks type of list', async function (): Promise<void> {
        expect(task.support(SystemTabs.ShoppingList)).toBeTruthy();
        expect(task.support(SystemTabs.EntireList)).toBeFalsy();
    });
});
