import AddEntryInteractor, {Request, Response} from './AddEntryInteractor';
import ListStorage from '../EntireList/ListStorage/ListStorage';
import EntryEntity from '../EntireList/ListStorage/EntryEntity';
import UniqueIdentifierGenerator from './UniqueIdentifierGenerator/UniqueIdentifierGenerator';

describe(AddEntryInteractor, function () {
  let storage: ListStorage, interactor: AddEntryInteractor, idGenerator: UniqueIdentifierGenerator;

  beforeEach(function () {
    storage = {
      getEntireList: jest.fn(),
      addEntryToEntireList: jest.fn()
    };
    idGenerator = {
      generate: jest.fn()
    };
    interactor = new AddEntryInteractor(storage, idGenerator);
  });

  it('should add new entry into the entire list and save in storage', function () {
    const id: string = 'test::id';
    const inputValue: string = 'test::inputValue:';
    const request: Request = new Request();
    request.inputValue = inputValue;
    const expectedEntry: EntryEntity = new EntryEntity();
    expectedEntry.id = id;
    expectedEntry.name = inputValue;
    const expectedResponse: Response = new Response();
    expectedResponse.inputValue = '';

    (idGenerator.generate as jest.Mock).mockReturnValueOnce(id);
    const result: Response = interactor.addNewEntry(request);

    expect(storage.addEntryToEntireList).toBeCalledWith(expectedEntry);
    expect(idGenerator.generate).toBeCalled();
    expect(result).toEqual(expectedResponse);
  });
});
