import EntireListLoadInteractor, {Response} from './EntireListLoadInteractor';
import EntryEntity from './ListStorage/EntryEntity';
import ListStorage from './ListStorage/ListStorage';

describe(EntireListLoadInteractor, function () {
  let interactor: EntireListLoadInteractor, listStorage: ListStorage;

  beforeEach(function () {
    listStorage = {
      saveEntireList: jest.fn,
      getEntireList: jest.fn()
    };
    interactor = new EntireListLoadInteractor(listStorage);
  });

  it('should load the entire list and return through the response model', function () {
    const entry: EntryEntity = new EntryEntity();
    entry.name = 'flour';
    const entireList: EntryEntity[] = [entry];

    (listStorage.getEntireList as jest.Mock).mockReturnValueOnce(entireList);

    const response: Response = interactor.loadEntireList();

    expect(response.entireList).toBe(entireList);
  });
});
