import Data from './Data';
import Pages from 'Core/ShoppingList/Pages';
import ParseHelper from 'Core/ParseHelper';

export default class Transformer {
    constructor(
        private parseHelper: ParseHelper
    ) {
    }

    public encode(data: Data): string {
        return JSON.stringify({page: data.page});
    }

    public parse(json: string | null): Data {
        if (json === null) return {page: Pages.LIST};
        const data = JSON.parse(json);
        return {page: this.parseHelper.get(data, 'page', Pages.LIST)};
    }
}
