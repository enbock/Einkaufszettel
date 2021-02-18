import EntryEntity from './EntryEntity';
import ListStorage from './ListStorage';

export class Response {
  public entireList: EntryEntity[] = [];
}

export default class EntireListInteractor {
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
