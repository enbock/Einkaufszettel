import TemporaryMemory from './TemporaryMemory';

describe('TemporaryMemory', function (): void {
    let memory: TemporaryMemory;

    beforeEach(function (): void {
        memory = new TemporaryMemory();
    });

    it('should have empty default values', async function (): Promise<void> {
        const actual: string = memory.readInputValue();

        expect(actual).toBe('');
    });

    it('should store and get a input value', async function (): Promise<void> {
        const inputValue = 'test::newInputValue:';

        memory.storeInputValue(inputValue);
        const actual: string = memory.readInputValue();

        expect(actual).toBe(inputValue);
    });

    it('should clear the store', async function (): Promise<void> {
        const inputValue = 'test::newInputValue:';

        memory.storeInputValue(inputValue);
        memory.clearInputValue();
        const actual: string = memory.readInputValue();

        expect(actual).toBe('');
    });
});
