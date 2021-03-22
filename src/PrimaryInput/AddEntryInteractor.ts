import {PresentableResponse} from './PrimaryInputPresenter';
import ListStorage from '../EntireList/ListStorage/ListStorage';
import EntryEntity from '../EntireList/ListStorage/EntryEntity';
import UniqueIdentifierGenerator from './UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import TemporaryMemory from './FormMemory/TemporaryMemory';

export class Response implements PresentableResponse {
  public inputValue: string = '';
}

export default class AddEntryInteractor {
  private readonly storage: ListStorage;
  private readonly idGenerator: UniqueIdentifierGenerator;
  private readonly temporaryMemory:TemporaryMemory;

  constructor(storage: ListStorage, idGenerator: UniqueIdentifierGenerator, temporaryMemory: TemporaryMemory) {
    this.storage = storage;
    this.idGenerator = idGenerator;
    this.temporaryMemory = temporaryMemory;
  }

  public addNewEntry(): Response {

    const entry: EntryEntity = new EntryEntity();
    entry.id = this.idGenerator.generate();
    entry.name = this.temporaryMemory.readInputValue();

    const currentList:EntryEntity[] = this.storage.getEntireList();
    currentList.push(entry);
    this.storage.saveEntireList(currentList);
    this.temporaryMemory.clearInputValue();

    return new Response();
  }
}
