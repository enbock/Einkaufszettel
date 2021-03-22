import EntryEntity from './ListStorage/EntryEntity';
import ListStorage from './ListStorage/ListStorage';

export class Response {
  public entireList: EntryEntity[] = [];
}

export default class EntireListLoadInteractor {
  private readonly listStorage: ListStorage;

  constructor(listStorage: ListStorage) {
    this.listStorage = listStorage;
  }

  public loadEntireList(): Response {
    const response:Response = new Response();
    response.entireList = this.listStorage.getEntireList();
    return response;
  }
}
