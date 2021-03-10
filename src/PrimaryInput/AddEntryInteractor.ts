import {PresentableResponse} from './PrimaryInputPresenter';
import ListStorage from '../EntireList/ListStorage/ListStorage';
import EntryEntity from '../EntireList/ListStorage/EntryEntity';
import UniqueIdentifierGenerator from './UniqueIdentifierGenerator/UniqueIdentifierGenerator';

export class Request {
  public inputValue: string = '';
}

export class Response implements PresentableResponse {
  public inputValue: string = '';
}

export default class AddEntryInteractor {
  private readonly storage: ListStorage;
  private readonly idGenerator: UniqueIdentifierGenerator;

  constructor(storage: ListStorage, idGenerator: UniqueIdentifierGenerator) {
    this.storage = storage;
    this.idGenerator = idGenerator;
  }

  public addNewEntry(request: Request): Response {
    const id: string = this.idGenerator.generate();

    const entry: EntryEntity = new EntryEntity();
    entry.id = id;
    entry.name = request.inputValue;

    this.storage.addEntryToEntireList(entry);

    return new Response();
  }
}
