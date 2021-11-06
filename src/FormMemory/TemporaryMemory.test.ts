import TemporaryMemory from './TemporaryMemory';

describe(TemporaryMemory, function () {
  let memory: TemporaryMemory;

  beforeEach(function () {
    memory = new TemporaryMemory();
  });

  it('should have empty default values', function () {
    const actual: string = memory.readInputValue();

    expect(actual).toBe('');
  });

  it('should store and get a input value', function () {
    const inputValue = 'test::newInputValue:';

    memory.storeInputValue(inputValue);
    const actual: string = memory.readInputValue();

    expect(actual).toBe(inputValue);
  });

  it('should clear the store', function () {
    const inputValue = 'test::newInputValue:';

    memory.storeInputValue(inputValue);
    memory.clearInputValue();
    const actual: string = memory.readInputValue();

    expect(actual).toBe('');
  });
});
