import Parser from './Parser';
import ParseHelper from 'Core/ParseHelper';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import {ImportDto} from 'Core/Setting/FileClient';

describe('Parser', function (): void {
    let parser: Parser;

    beforeEach(function (): void {
        parser = new Parser(
            new ParseHelper()
        );
    });

    it('should correctly parse JSON content into ImportDto', function (): void {
        const fileContent = JSON.stringify({
            entireList: [
                {id: '1', name: 'Item1'},
                {id: '2', name: 'Item2'}
            ],
            shoppingList: [
                {id: '3', name: 'Item3'}
            ]
        });

        const result: ImportDto = parser.parseJson(fileContent);

        const item1: EntryEntity = new EntryEntity();
        item1.id = '1';
        item1.name = 'Item1';
        const item2: EntryEntity = new EntryEntity();
        item2.id = '2';
        item2.name = 'Item2';
        const item3: EntryEntity = new EntryEntity();
        item3.id = '3';
        item3.name = 'Item3';
        const entireListExpected: Array<EntryEntity> = [item1, item2];
        const shoppingListExpected: Array<EntryEntity> = [item3];
        expect(result.entireList).toEqual(entireListExpected);
        expect(result.shoppingList).toEqual(shoppingListExpected);
    });

    it('should ignore wrong data', function (): void {
        const emptyData: ImportDto = {entireList: [], shoppingList: []};

        expect(parser.parseJson(undefined!)).toEqual(emptyData);
        expect(parser.parseJson('')).toEqual(emptyData);
        expect(parser.parseJson('{')).toEqual(emptyData);
        expect(parser.parseJson('{"nix":"da"}')).toEqual(emptyData);
        expect(parser.parseJson('{"entireList":[{"nix":"da"}]}')).toEqual(emptyData);
        expect(parser.parseJson('{"entireList":[{"id":"da"}]}')).toEqual(emptyData);
    });
});
