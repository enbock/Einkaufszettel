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

  it('should load and sort the entire list and return through the response model', function () {
    const entry1: EntryEntity = new EntryEntity();
    entry1.name = 'flour';
    const entry2: EntryEntity = new EntryEntity();
    entry2.name = 'apple';
    const entry3: EntryEntity = new EntryEntity();
    entry3.name = 'Äpfel';
    const entry4: EntryEntity = new EntryEntity();
    entry4.name = 'flour';
    const entireList: EntryEntity[] = [entry1, entry3, entry4, entry2];

    (listStorage.getEntireList as jest.Mock).mockReturnValueOnce(entireList);

    const response: Response = interactor.loadEntireList();

    expect(response.entireList).toEqual([entry3, entry2, entry1, entry4]);
  });
});
