export default interface TemporaryMemory {
  storeInputValue(inputValue: string): void;

  readInputValue(): string;

  clearInputValue(): void;
}
