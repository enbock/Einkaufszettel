import StringHelper from './StringHelper';

describe('StringHelper', function (): void {
    it('should replace umlauts', async function (): Promise<void> {
        const input: string = 'ÄÖÜẞäöüßâûô';
        const expected: string = 'AEOEUESaeoeuessauo';

        expect(StringHelper.replaceUmlaut(input)).toBe(expected);
    });

    it('should sort objects by string property', async function (): Promise<void> {
        const objectA: Object = {name: 'Ödipus', foo: 'bar'};
        const objectB: Object = {name: 'Antman', foo: 'foo'};
        const objectC: Object = {name: 'Zeus'};
        const objectD: Object = {name: 'ßÄÖÜäöüß', foo: 'Umlauts'};
        const objectE: Object = {name: 'Delta', foo: 'sort variants'};
        const objectF: Object = {name: 'Berta', foo: 'sort variants'};

        const list: Object[] = [objectA, objectB, objectC, objectD, objectE, objectF, objectF];
        const result: Object[] = StringHelper.sortList(list, 'name');

        const expectedList: Object[] = [objectB, objectF, objectF, objectE, objectA, objectD, objectC];
        expect(result).toEqual(expectedList);
    });

    it('should ignore sorting on unknown properties', async function (): Promise<void> {
        const objectA: Object = {unknown: 'Ödipus', foo: 'bar'};
        const objectB: Object = {other: 'Antman', foo: 'foo'};
        const objectC: Object = {name: 'Zeus'};

        const list: Object[] = [objectA, objectB, objectC];
        const result: Object[] = StringHelper.sortList(list, 'name');

        const expectedList: Object[] = [objectA, objectB, objectC];
        expect(result).toEqual(expectedList);
    });

    it('should sort objects multiple times', async function (): Promise<void> {
        const objectA: Object = {first: 'Armin', second: 'Cool'};
        const objectB: Object = {first: 'Zodiac', second: 'Cool'};
        const objectC: Object = {first: 'Barbel', second: 'Alter'};
        const objectD: Object = {first: 'Armin', second: 'Alter'};
        const objectE: Object = {first: 'Erwin', second: 'Charles'};
        const objectF: Object = {second: 'Xenos'};
        const list: Object[] = [objectA, objectB, objectC, objectD, objectE, objectF];
        const result: Object[] = StringHelper.sortListByProperties(list, ['second', 'first']);

        const expectedList: Object[] = [objectD, objectC, objectE, objectA, objectB, objectF];
        expect(result).toEqual(expectedList);
    });
});
