import EntryEntity from './ListStorage/EntryEntity';
import ListStorage from './ListStorage/ListStorage';
import StringUmlautHelper from '../Helper/StringUmlautHelper';

export class Response {
  public entireList: EntryEntity[] = [];
}

export default class EntireListLoadInteractor {
  private readonly listStorage: ListStorage;

  constructor(listStorage: ListStorage) {
    this.listStorage = listStorage;
  }

  public loadEntireList(): Response {
    const response: Response = new Response();
    response.entireList = EntireListLoadInteractor.sortList(this.listStorage.getEntireList());
    return response;
  }

  private static sortList(entireList: EntryEntity[]): EntryEntity[] {
    return entireList.sort(EntireListLoadInteractor.compareNames);
  }

  private static compareNames(a:EntryEntity, b:EntryEntity):number {
    const upperA:string = StringUmlautHelper.replaceUmlaut(a.name).toUpperCase();
    const upperB:string = StringUmlautHelper.replaceUmlaut(b.name).toUpperCase();
    if (upperA < upperB) {
      return -1;
    }
    if (upperA > upperB) {
      return 1;
    }

    return 0;
  }
}
