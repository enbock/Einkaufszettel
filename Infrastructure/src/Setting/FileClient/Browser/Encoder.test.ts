import Encoder from './Encoder';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

describe('Encoder', function (): void {
    let encoder: Encoder,
        entireList: Array<EntryEntity>,
        shoppingList: Array<EntryEntity>
    ;

    beforeEach(() => {
        encoder = new Encoder();
        entireList = [
            {id: '1', name: 'Milk'},
            {id: '2', name: 'Bread'}
        ];
        shoppingList = [
            {id: '2', name: 'Bread'}
        ];
    });

    it('should encode entire list and shopping list as siblings with correct structure', () => {
        const expectedEncodedString: string = JSON.stringify({
            entireList: [
                {id: '1', name: 'Milk'},
                {id: '2', name: 'Bread'}
            ],
            shoppingList: [
                {id: '2', name: 'Bread'}
            ]
        });

        const result: string = encoder.encode(entireList, shoppingList);

        expect(result).toEqual(expectedEncodedString);
    });
});
