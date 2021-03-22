import {PresentableResponse} from './PrimaryInputPresenter';
import ListStorage from '../EntireList/ListStorage/ListStorage';
import EntryEntity from '../EntireList/ListStorage/EntryEntity';
import UniqueIdentifierGenerator from './UniqueIdentifierGenerator/UniqueIdentifierGenerator';
import FormMemory from './FormMemory/FormMemory';

export class Response implements PresentableResponse {
  public inputValue: string = '';
}

export default class AddEntryInteractor {
  private readonly storage: ListStorage;
  private readonly idGenerator: UniqueIdentifierGenerator;
  private readonly temporaryMemory: FormMemory;

  constructor(storage: ListStorage, idGenerator: UniqueIdentifierGenerator, temporaryMemory: FormMemory) {
    this.storage = storage;
    this.idGenerator = idGenerator;
    this.temporaryMemory = temporaryMemory;
  }

  public addNewEntry(): Response {

    const entry: EntryEntity = new EntryEntity();
    entry.id = this.idGenerator.generate();
    entry.name = this.temporaryMemory.readInputValue();

    const currentList: EntryEntity[] = this.storage.getEntireList();
    currentList.push(entry);
    this.storage.saveEntireList(currentList);
    this.temporaryMemory.clearInputValue();

    return new Response();
  }
}
