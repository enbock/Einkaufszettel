export default interface FormMemory {
  storeInputValue(inputValue: string): void;

  readInputValue(): string;

  clearInputValue(): void;
}
