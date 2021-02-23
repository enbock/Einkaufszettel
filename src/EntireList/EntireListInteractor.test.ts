import EntireListInteractor, {Response} from './EntireListInteractor';
import EntryEntity from './ListStorage/EntryEntity';
import ListStorage from './ListStorage/ListStorage';

describe(EntireListInteractor, function () {
  let interactor:EntireListInteractor, listStorage: ListStorage;

  beforeEach(function () {
    listStorage = {getEntireList: jest.fn()};
    interactor = new EntireListInteractor(listStorage);
  })

  it('should load the entire list and return through the response model', function () {
    const entry:EntryEntity = new EntryEntity();
    entry.name = 'flour';
    const entireList:EntryEntity[] = [entry];

    (listStorage.getEntireList as jest.Mock).mockReturnValueOnce(entireList);

    const response:Response = interactor.loadEntireList();

    expect(response.entireList).toBe(entireList);
  });
})
