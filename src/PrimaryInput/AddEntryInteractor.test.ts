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
      addEntryToEntireList: jest.fn()
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
    const expectedEntry: EntryEntity = new EntryEntity();
    expectedEntry.id = id;
    expectedEntry.name = inputValue;
    const expectedResponse: Response = new Response();
    expectedResponse.inputValue = '';

    (idGenerator.generate as jest.Mock).mockReturnValueOnce(id);
    (temporaryMemory.readInputValue as jest.Mock).mockReturnValueOnce(inputValue);

    const result: Response = interactor.addNewEntry();

    expect(storage.addEntryToEntireList).toBeCalledWith(expectedEntry);
    expect(idGenerator.generate).toBeCalled();
    expect(temporaryMemory.readInputValue).toBeCalled();
    expect(temporaryMemory.clearInputValue).toBeCalled();
    expect(result).toEqual(expectedResponse);
  });
});
