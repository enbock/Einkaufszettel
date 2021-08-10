interface DataStructure {
  inputValue: string
}

export default class TemporaryMemory {
  private store: DataStructure;

  constructor() {
    this.store = TemporaryMemory.factoryStore();
  }

  private static factoryStore(): DataStructure {
    return {inputValue: ''};
  }

  public storeInputValue(inputValue: string): void {
    this.store.inputValue = inputValue;
  }

  public readInputValue(): string {
    return this.store.inputValue;
  }

  public clearInputValue(): void {
    this.store = TemporaryMemory.factoryStore();
  }
}
