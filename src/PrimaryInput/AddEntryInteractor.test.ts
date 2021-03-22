import AddEntryInteractor, {Response} from './AddEntryInteractor';
import ListStorage from '../EntireList/ListStorage/ListStorage';
import EntryEntity from '../EntireList/ListStorage/EntryEntity';
import UniqueIdentifierGenerator from './UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import TemporaryMemory from './TemporaryMemory/TemporaryMemory';

describe(AddEntryInteractor, function () {
  let storage: ListStorage,
    interactor: AddEntryInteractor,
    idGenerator: UniqueIdentifierGenerator,
    temporaryMemory: TemporaryMemory
  ;

  beforeEach(function () {
    storage = {
      getEntireList: jest.fn(),
      saveEntireList: jest.fn()
    };
    idGenerator = {
      generate: jest.fn()
    };
    temporaryMemory = {
      clearInputValue: jest.fn(),
      readInputValue: jest.fn(),
      storeInputValue: jest.fn()
    };
    interactor = new AddEntryInteractor(storage, idGenerator, temporaryMemory);
  });

  it('should add new entry into the entire list and save in storage', function () {
    const id: string = 'test::id';
    const inputValue: string = 'test::inputValue:';
    const newEntry: EntryEntity = new EntryEntity();
    newEntry.id = id;
    newEntry.name = inputValue;
    const expectedResponse: Response = new Response();
    expectedResponse.inputValue = '';
    const oldEntry:EntryEntity = new EntryEntity();
    oldEntry.id = 'test::oldEntry';
    const entireList:EntryEntity[] = [oldEntry];

    (storage.getEntireList as jest.Mock).mockReturnValueOnce(entireList);
    (idGenerator.generate as jest.Mock).mockReturnValueOnce(id);
    (temporaryMemory.readInputValue as jest.Mock).mockReturnValueOnce(inputValue);

    const result: Response = interactor.addNewEntry();

    expect(storage.getEntireList).toBeCalled();
    expect(storage.saveEntireList).toBeCalledWith([oldEntry, newEntry]);
    expect(idGenerator.generate).toBeCalled();
    expect(temporaryMemory.readInputValue).toBeCalled();
    expect(temporaryMemory.clearInputValue).toBeCalled();
    expect(result).toEqual(expectedResponse);
  });
});
