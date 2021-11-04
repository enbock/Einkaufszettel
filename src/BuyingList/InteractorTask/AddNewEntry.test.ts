import AddNewEntry from './AddNewEntry';
import {mock, MockProxy} from 'jest-mock-extended';
import EntryEntity from '../ListStorage/EntryEntity';
import {SystemTabs} from '../../Navigation/TabEntity';
import ListStorage from '../ListStorage/ListStorage';
import UniqueIdentifierGenerator from '../../PrimaryInput/UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from '../../PrimaryInput/FormMemory/FormMemory';
import NavigationMemory from '../../Navigation/Memory/Memory';
import AddEntryToShoppingList from './AddEntryToShoppingList';

describe(AddNewEntry, function () {
  let task: AddNewEntry,
    storage: ListStorage & MockProxy<ListStorage>,
    idGenerator: UniqueIdentifierGenerator & MockProxy<UniqueIdentifierGenerator>,
    formMemory: FormMemory & MockProxy<FormMemory>,
    navigationMemory: NavigationMemory & MockProxy<NavigationMemory>,
    addEntryToShoppingList: AddEntryToShoppingList & MockProxy<AddEntryToShoppingList>
  ;

  beforeEach(function () {
    storage = mock<ListStorage>();
    idGenerator = mock<UniqueIdentifierGenerator>();
    formMemory = mock<FormMemory>();
    navigationMemory = mock<NavigationMemory>();
    addEntryToShoppingList = mock<AddEntryToShoppingList>();
    task = new AddNewEntry(
      storage,
      idGenerator,
      formMemory,
      navigationMemory,
      addEntryToShoppingList
    );
  });

  it('should add new entry also to shipping list, if active', function () {
    const id: string = 'test::id';
    const inputValue: string = 'test::inputValue:';
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = id;
    newEntry.name = inputValue;

    storage.getEntireList.mockReturnValueOnce([]);
    idGenerator.generate.mockReturnValueOnce(id);
    formMemory.readInputValue.mockReturnValueOnce(inputValue);
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);

    task.addNewEntry();

    expect(addEntryToShoppingList.addToShoppingList).toBeCalledWith(newEntry);
  });

  it('should add new entry', function () {
    const id: string = 'test::id';
    const inputValue: string = 'test::inputValue:';
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = id;
    newEntry.name = inputValue;

    storage.getEntireList.mockReturnValueOnce([]);
    idGenerator.generate.mockReturnValueOnce(id);
    formMemory.readInputValue.mockReturnValueOnce(inputValue);
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.EntireList);

    task.addNewEntry();

    expect(addEntryToShoppingList.addToShoppingList).not.toBeCalled();
  });

  it('should reuse entry and add also to shipping list, if active', function () {
    const id: string = 'test::id';
    const inputValue: string = 'test::inputValue:';
    const existingEntry: EntryEntity = new EntryEntity();
    existingEntry.id = id;
    existingEntry.name = inputValue;

    storage.getEntireList.mockReturnValueOnce([existingEntry]);
    formMemory.readInputValue.mockReturnValueOnce(inputValue);
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);

    task.addNewEntry();

    expect(addEntryToShoppingList.addToShoppingList).toBeCalledWith(existingEntry);
  });
});
