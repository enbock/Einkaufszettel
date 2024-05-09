import AddNewEntry from './AddNewEntry';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {SystemTabs} from 'Core/Navigation/TabEntity';
import ListStorage from 'Core/BuyingList/ListStorage';
import UniqueIdentifierGenerator from 'Core/PrimaryInput/UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import NavigationMemory from 'Core/Navigation/StateStorage';
import AddEntryToShoppingList from './AddEntryToShoppingList';
import UndoEntity, {Actions} from 'Core/Undo/UndoEntity';
import UndoStorage from 'Core/Undo/UndoStorage';

describe('AddNewEntry', function (): void {
    let task: AddNewEntry,
        storage: Mocked<ListStorage>,
        idGenerator: Mocked<UniqueIdentifierGenerator>,
        formMemory: Mocked<FormMemory>,
        navigationMemory: Mocked<NavigationMemory>,
        addEntryToShoppingList: Mocked<AddEntryToShoppingList>,
        undoStorage: Mocked<UndoStorage>
    ;

    beforeEach(function (): void {
        storage = mock<ListStorage>();
        idGenerator = mock<UniqueIdentifierGenerator>();
        formMemory = mock<FormMemory>();
        navigationMemory = mock<NavigationMemory>();
        addEntryToShoppingList = mock<AddEntryToShoppingList>();
        undoStorage = mock<UndoStorage>();

        task = new AddNewEntry(
            storage,
            idGenerator,
            formMemory,
            navigationMemory,
            addEntryToShoppingList,
            undoStorage
        );
    });

    it('should add new entry also to shipping list, if active', async function (): Promise<void> {
        const id: string = 'test::id';
        const inputValue: string = 'test::inputValue:';
        const newEntry: EntryEntity = new EntryEntity();
        newEntry.id = id;
        newEntry.name = inputValue;

        storage.getEntireList.and.returnValue([]);
        idGenerator.generate.and.returnValue(id);
        formMemory.readInputValue.and.returnValue(inputValue);
        navigationMemory.getActiveTab.and.returnValue(SystemTabs.ShoppingList);

        task.addNewEntry();

        expect(addEntryToShoppingList.addToShoppingList).toHaveBeenCalledWith(newEntry);
    });

    it('should add new entry', async function (): Promise<void> {
        const id: string = 'test::id';
        const inputValue: string = 'test::inputValue:';
        const newEntry: EntryEntity = new EntryEntity();
        newEntry.id = id;
        newEntry.name = inputValue;

        storage.getEntireList.and.returnValue([]);
        idGenerator.generate.and.returnValue(id);
        formMemory.readInputValue.and.returnValue(inputValue);
        navigationMemory.getActiveTab.and.returnValue(SystemTabs.EntireList);

        task.addNewEntry();

        expect(addEntryToShoppingList.addToShoppingList).not.toHaveBeenCalled();

        const expectedUndoItem: UndoEntity = new UndoEntity();
        expectedUndoItem.action = Actions.CREATE;
        expectedUndoItem.entryId = id;
        expectedUndoItem.newValue = inputValue;
        expect(undoStorage.appendChange).toHaveBeenCalledWith(expectedUndoItem);
    });

    it('should reuse entry and add also to shipping list, if active', async function (): Promise<void> {
        const id: string = 'test::id';
        const inputValue: string = 'test::inputValue:';
        const existingEntry: EntryEntity = new EntryEntity();
        existingEntry.id = id;
        existingEntry.name = inputValue;

        storage.getEntireList.and.returnValue([existingEntry]);
        formMemory.readInputValue.and.returnValue(inputValue);
        navigationMemory.getActiveTab.and.returnValue(SystemTabs.ShoppingList);

        task.addNewEntry();

        expect(addEntryToShoppingList.addToShoppingList).toHaveBeenCalledWith(existingEntry);
    });
});
