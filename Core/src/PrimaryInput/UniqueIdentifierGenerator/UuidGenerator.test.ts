import UuidGenerator from './UuidGenerator';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;

describe('UuidGenerator', function (): void {
    let uuidVersion4: Spy, generator: UuidGenerator;

    beforeEach(function (): void {
        uuidVersion4 = createSpy();
        generator = new UuidGenerator(uuidVersion4);
    });

    it('should generate uuid v4', async function (): Promise<void> {
        const uuidValue: string = 'test::uuid-v4:';

        uuidVersion4.and.returnValue(uuidValue);

        const result: string = generator.generate();

        expect(result).toEqual(uuidValue);
        expect(uuidVersion4).toHaveBeenCalled();
    });
});
