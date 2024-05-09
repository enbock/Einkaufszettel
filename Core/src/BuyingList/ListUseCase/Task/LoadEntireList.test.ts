import LoadEntireList from './LoadEntireList';
import ListStorage from 'Core/BuyingList/ListStorage';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {SystemTabs} from 'Core/Navigation/TabEntity';

describe('LoadEntireList', function (): void {
    let task: LoadEntireList,
        listStorage: Mocked<ListStorage>
    ;

    beforeEach(function (): void {
        listStorage = mock<ListStorage>();
        task = new LoadEntireList(listStorage);
    });

    it('should can load entire list', async function (): Promise<void> {
        const entry1: EntryEntity = new EntryEntity();
        entry1.id = 'test::1:';
        const entry2: EntryEntity = new EntryEntity();
        entry2.id = 'test::2:';
        const shoppingListEntry1: EntryEntity = new EntryEntity();
        shoppingListEntry1.id = 'test::2:';
        listStorage.getEntireList.and.returnValue([entry2, entry1]);
        listStorage.getShoppingList.and.returnValue([shoppingListEntry1]);

        const actual: EntryEntity[] = task.loadList();

        expect(actual).toEqual([entry1]);
    });

    it('should checks type of list', async function (): Promise<void> {
        expect(task.support(SystemTabs.EntireList)).toBeTruthy();
        expect(task.support(SystemTabs.ShoppingList)).toBeFalsy();
    });
});
