import EntryEntity from 'Core/ShoppingList/EntryEntity';

export default class Encoder {
    public encode(entireList: Array<EntryEntity>, shoppingList: Array<EntryEntity>): string {
        return JSON.stringify({
            entireList: entireList.map(entry => this.encodeItem(entry)),
            shoppingList: shoppingList.map(entry => this.encodeItem(entry))
        });
    }

    private encodeItem(entry: EntryEntity): object {
        return {
            id: entry.id,
            name: entry.name
        };
    }
}
