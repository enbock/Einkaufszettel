import Transformer from './Transformer';
import Data from './Data';
import Pages from 'Core/ShoppingList/Pages';
import ParseHelper from 'Core/ParseHelper';

describe('Transformer', function (): void {
    let transformer: Transformer;

    beforeEach(function (): void {
        transformer = new Transformer(
            new ParseHelper()
        );
    });

    it('should encode the data correctly', async function (): Promise<void> {
        const data: Data = {page: <MockedObject>'testPage'};
        const encodedData: string = transformer.encode(data);
        expect(encodedData).toBe(JSON.stringify({page: <MockedObject>'testPage'}));
    });

    it('should parse the data correctly', async function (): Promise<void> {
        const json: string = JSON.stringify({page: 'testPage'});
        const parsedData: Data = transformer.parse(json);
        expect(parsedData).toEqual({page: <MockedObject>'testPage'});
    });

    it('should return an object with page property as an Pages.LIST when json is null',
        async function (): Promise<void> {
            const parsedData: Data = transformer.parse(null);
            expect(parsedData).toEqual({page: Pages.LIST});
        });
});
