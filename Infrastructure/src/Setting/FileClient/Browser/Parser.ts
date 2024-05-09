import ParseHelper from 'Core/ParseHelper';
import {ImportDto} from 'Core/Setting/FileClient';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

export default class Parser {
    constructor(
        private parseHelper: ParseHelper
    ) {
    }

    public parseJson(fileContent: string): ImportDto {
        let jsonData;
        try {
            jsonData = JSON.parse(fileContent);
        } catch {
            return {entireList: [], shoppingList: []};
        }

        const entireJsonList: Array<JsonData> =
            this.parseHelper.get<Array<object>>(jsonData, 'entireList', []) || []
        ;
        const shoppingJsonList: Array<JsonData> =
            this.parseHelper.get<Array<object>>(jsonData, 'shoppingList', []) || []
        ;
        const entireList = entireJsonList
            .map(entry => this.parseEntry(entry))
            .filter(e => e.id != '' && e.name != '')
        ;
        const shoppingList = shoppingJsonList
            .map(entry => this.parseEntry(entry))
            .filter(e => e.id != '' && e.name != '')
        ;

        return {
            entireList,
            shoppingList
        };
    }

    private parseEntry(entry: JsonData): EntryEntity {
        const result: EntryEntity = new EntryEntity();

        result.id = String(this.parseHelper.get<string>(entry, 'id', ''));
        result.name = String(this.parseHelper.get<string>(entry, 'name', ''));

        return result;
    }
}
