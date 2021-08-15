import AddEntryInteractor from './AddEntryInteractor';
import ListStorage from './ListStorage/ListStorage';
import EntryEntity from './ListStorage/EntryEntity';
import UniqueIdentifierGenerator from '../PrimaryInput/UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';
import {mock, MockProxy} from 'jest-mock-extended';
import NavigationMemory from '../Navigation/Memory/Memory';
import {SystemTabs} from '../Navigation/TabEntity';

describe(AddEntryInteractor, function () {
  let storage: ListStorage & MockProxy<ListStorage>,
    interactor: AddEntryInteractor,
    idGenerator: UniqueIdentifierGenerator,
    temporaryMemory: FormMemory,
    navigationMemory: NavigationMemory & MockProxy<NavigationMemory>
  ;

  beforeEach(function () {
    storage = mock<ListStorage>();
    idGenerator = {
      generate: jest.fn()
    };
    temporaryMemory = {
      clearInputValue: jest.fn(),
      readInputValue: jest.fn(),
      storeInputValue: jest.fn()
    };
    navigationMemory = mock<NavigationMemory>();
    interactor = new AddEntryInteractor(storage, idGenerator, temporaryMemory, navigationMemory);
  });

  it('should add new entry into the entire list and save in storage', function () {
    const id: string = 'test::id';
    const inputValue: string = 'test::inputValue:';
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = id;
    newEntry.name = inputValue;
    const oldEntry: EntryEntity = new EntryEntity();
    oldEntry.id = 'test::oldEntry';
    const entireList: EntryEntity[] = [oldEntry];

    (storage.getEntireList as jest.Mock).mockReturnValueOnce(entireList);
    (idGenerator.generate as jest.Mock).mockReturnValueOnce(id);
    (temporaryMemory.readInputValue as jest.Mock).mockReturnValueOnce(inputValue);
    storage.getShoppingList.mockReturnValueOnce([]);
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.EntireList);

    interactor.addNewEntry();

    expect(storage.getEntireList).toBeCalled();
    expect(storage.saveEntireList).toBeCalledWith([oldEntry, newEntry]);
    expect(storage.saveShoppingList).not.toBeCalled();
    expect(idGenerator.generate).toBeCalled();
    expect(temporaryMemory.readInputValue).toBeCalled();
    expect(temporaryMemory.clearInputValue).toBeCalled();
  });

  it('should avoid double addings', function () {
    const id: string = 'test::id:';
    const inputValue: string = 'test::inputValue:';
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = id;
    newEntry.name = inputValue;
    const oldEntry: EntryEntity = new EntryEntity();
    oldEntry.id = 'test::old-id:';
    oldEntry.name = ' TEST::InputValue: ';

    (storage.getEntireList as jest.Mock).mockReturnValueOnce([oldEntry]);
    (idGenerator.generate as jest.Mock).mockReturnValueOnce(id);
    (temporaryMemory.readInputValue as jest.Mock).mockReturnValueOnce(inputValue);
    storage.getShoppingList.mockReturnValueOnce([]);
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);

    interactor.addNewEntry();

    expect(storage.getEntireList).toBeCalled();
    expect(storage.saveEntireList).toBeCalledWith([oldEntry]);
    expect(storage.saveShoppingList).toBeCalledWith([oldEntry]);
    expect(idGenerator.generate).toBeCalled();
    expect(temporaryMemory.readInputValue).toBeCalled();
    expect(temporaryMemory.clearInputValue).toBeCalled();
  });

  it('should add new entry also to shipping list, if active', function () {
    const id: string = 'test::id';
    const inputValue: string = 'test::inputValue:';
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = id;
    newEntry.name = inputValue;

    (storage.getEntireList as jest.Mock).mockReturnValueOnce([]);
    (idGenerator.generate as jest.Mock).mockReturnValueOnce(id);
    (temporaryMemory.readInputValue as jest.Mock).mockReturnValueOnce(inputValue);
    storage.getShoppingList.mockReturnValueOnce([]);
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);

    interactor.addNewEntry();

    expect(storage.saveShoppingList).toBeCalledWith([newEntry]);
  });

  it('should not double add entry to shopping list', function () {
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = 'test::id:';
    newEntry.name = 'test::name:';
    storage.getShoppingList.mockReturnValueOnce([newEntry]);
    interactor.addToShoppingList(newEntry);

    expect(storage.saveShoppingList).not.toBeCalled();
  });

  it('should add entry to shopping list', function () {
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = 'test::id:';
    newEntry.name = 'test::name:';
    storage.getShoppingList.mockReturnValueOnce([]);
    interactor.addToShoppingList(newEntry);

    expect(storage.saveShoppingList).toBeCalledWith([newEntry]);
  });

  it('should add entry-id to shopping list', function () {
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = 'test::id:';
    newEntry.name = 'test::name:';
    storage.getEntireList.mockReturnValueOnce([newEntry]);
    storage.getShoppingList.mockReturnValueOnce([]);
    interactor.addEntryIdToShoppingList('test::id:');

    expect(storage.saveShoppingList).toBeCalledWith([newEntry]);
  });

  it('should ignore wrong entry-id while adding to shopping list', function () {
    storage.getEntireList.mockReturnValueOnce([]);
    interactor.addEntryIdToShoppingList('test::id:');

    expect(storage.saveShoppingList).not.toBeCalled();
  });
});
