import Transformer from './Transformer';
import Data from './Data';
import Pages from '../../Pages';

describe(Transformer, function (): void {
    let transformer: Transformer;

    beforeEach(function (): void {
        transformer = new Transformer();
    });

    it('should encode the data correctly', function (): void {
        const data: Data = {page: 'testPage' as MockedObject};
        const encodedData: string = transformer.encode(data);
        expect(encodedData).toBe(JSON.stringify({page: 'testPage'}));
    });

    it('should parse the data correctly', function (): void {
        const json: string = JSON.stringify({page: 'testPage'});
        const parsedData: Data = transformer.parse(json);
        expect(parsedData).toEqual({page: 'testPage'});
    });

    it('should return an object with page property as an Pages.LIST when json is null', function (): void {
        const parsedData: Data = transformer.parse(null);
        expect(parsedData).toEqual({page: Pages.LIST});
    });
});
