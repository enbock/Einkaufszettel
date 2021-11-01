import ListInteractor from './ListInteractor';
import ListStorage from './ListStorage/ListStorage';
import EntryEntity from './ListStorage/EntryEntity';
import UniqueIdentifierGenerator from '../PrimaryInput/UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';
import {mock, MockProxy} from 'jest-mock-extended';
import NavigationMemory from '../Navigation/Memory/Memory';
import {SystemTabs} from '../Navigation/TabEntity';
import SelectionStorage from './SelectionStorage/SelectionStorage';
import LoadListTask from './InteractorTask/LoadListTask';

describe(ListInteractor, function () {
  let storage: ListStorage & MockProxy<ListStorage>,
    interactor: ListInteractor,
    idGenerator: UniqueIdentifierGenerator & MockProxy<UniqueIdentifierGenerator>,
    formMemory: FormMemory & MockProxy<FormMemory>,
    navigationMemory: NavigationMemory & MockProxy<NavigationMemory>,
    selectionStorage: SelectionStorage & MockProxy<SelectionStorage>,
    loadingTask: LoadListTask & MockProxy<LoadListTask>
  ;

  beforeEach(function () {
    storage = mock<ListStorage>();
    idGenerator = mock<UniqueIdentifierGenerator>();
    formMemory = mock<FormMemory>();
    navigationMemory = mock<NavigationMemory>();
    selectionStorage = mock<SelectionStorage>();
    loadingTask = mock<LoadListTask>();
    interactor = new ListInteractor(
      storage,
      idGenerator,
      formMemory,
      navigationMemory,
      selectionStorage,
      [loadingTask, loadingTask]
    );
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
    (formMemory.readInputValue as jest.Mock).mockReturnValueOnce(inputValue);
    storage.getShoppingList.mockReturnValueOnce([]);
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.EntireList);

    interactor.addNewEntry();

    expect(storage.getEntireList).toBeCalled();
    expect(storage.saveEntireList).toBeCalledWith([oldEntry, newEntry]);
    expect(storage.saveShoppingList).not.toBeCalled();
    expect(idGenerator.generate).toBeCalled();
    expect(formMemory.readInputValue).toBeCalled();
    expect(formMemory.clearInputValue).toBeCalled();
  });

  it('should avoid double adds', function () {
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
    (formMemory.readInputValue as jest.Mock).mockReturnValueOnce(inputValue);
    storage.getShoppingList.mockReturnValueOnce([]);
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);

    interactor.addNewEntry();

    expect(storage.getEntireList).toBeCalled();
    expect(storage.saveEntireList).toBeCalledWith([oldEntry]);
    expect(storage.saveShoppingList).toBeCalledWith([oldEntry]);
    expect(idGenerator.generate).toBeCalled();
    expect(formMemory.readInputValue).toBeCalled();
    expect(formMemory.clearInputValue).toBeCalled();
  });

  it('should add new entry also to shipping list, if active', function () {
    const id: string = 'test::id';
    const inputValue: string = 'test::inputValue:';
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = id;
    newEntry.name = inputValue;

    (storage.getEntireList as jest.Mock).mockReturnValueOnce([]);
    (idGenerator.generate as jest.Mock).mockReturnValueOnce(id);
    (formMemory.readInputValue as jest.Mock).mockReturnValueOnce(inputValue);
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
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.EntireList);
    interactor.addOrRemoveEntry('test::id:');

    expect(storage.saveShoppingList).toBeCalledWith([newEntry]);
  });

  it('should remove entry-id to shopping list', function () {
    const entry1: EntryEntity = new EntryEntity();
    entry1.id = 'test::id:';
    const entry2: EntryEntity = new EntryEntity();
    entry2.id = 'test::id2:';

    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.ShoppingList);
    storage.getShoppingList.mockReturnValueOnce([entry1, entry2]);
    interactor.addOrRemoveEntry('test::id:');

    expect(storage.saveShoppingList).toBeCalledWith([entry2]);
  });

  it('should ignore wrong entry-id while adding to shopping list', function () {
    navigationMemory.getActiveTab.mockReturnValueOnce(SystemTabs.EntireList);
    storage.getEntireList.mockReturnValueOnce([]);
    interactor.addOrRemoveEntry('test::id:');

    expect(storage.saveShoppingList).not.toBeCalled();
  });

  it('should save the new selected entry', function () {
    const entry: EntryEntity = new EntryEntity();
    entry.id = 'test::id:';
    entry.name = 'test::inputValue:';

    navigationMemory.getActiveTab.mockReturnValueOnce('test::active:');
    loadingTask.support.mockReturnValueOnce(false);
    loadingTask.support.mockReturnValueOnce(true);
    loadingTask.loadList.mockReturnValueOnce([entry]);

    interactor.changeSelectedEntry('test::id:');

    expect(selectionStorage.saveSelectedEntry).toBeCalledWith('test::id:');
    expect(formMemory.storeInputValue).toBeCalledWith('test::inputValue:');
    expect(loadingTask.support).toBeCalledWith('test::active:');
    expect(loadingTask.support).toBeCalledTimes(2);
    expect(loadingTask.loadList).toBeCalledTimes(1);
  });
});
