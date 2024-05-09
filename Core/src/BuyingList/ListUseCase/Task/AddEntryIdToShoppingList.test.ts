import AddEntryIdToShoppingList from './AddEntryIdToShoppingList';
import ListStorage from 'Core/BuyingList/ListStorage';
import AddEntryToShoppingList from './AddEntryToShoppingList';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

describe('AddEntryIdToShoppingList', function (): void {
    let task: AddEntryIdToShoppingList,
        storage: Mocked<ListStorage>,
        addEntryToShoppingList: Mocked<AddEntryToShoppingList>
    ;

    beforeEach(function (): void {
        storage = mock<ListStorage>();
        addEntryToShoppingList = mock<AddEntryToShoppingList>();
        task = new AddEntryIdToShoppingList(storage, addEntryToShoppingList);
    });

    it('should add an entry by id to the shopping list', async function (): Promise<void> {
        const newEntry: EntryEntity = new EntryEntity();
        newEntry.id = 'test::id:';
        newEntry.name = 'test::name:';

        storage.getEntireList.and.returnValue([newEntry]);

        task.addEntryIdToShoppingList('test::id:');

        expect(addEntryToShoppingList.addToShoppingList).toHaveBeenCalledWith(newEntry);
    });

    it('should not add an entry by unknown ids', async function (): Promise<void> {

        storage.getEntireList.and.returnValue([]);

        task.addEntryIdToShoppingList('test::id:');

        expect(addEntryToShoppingList.addToShoppingList).not.toHaveBeenCalled();
    });
});
