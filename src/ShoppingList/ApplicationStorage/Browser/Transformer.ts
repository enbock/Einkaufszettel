import Data from './Data';
import get from 'lodash/get';
import Pages from '../../Pages';

export default class Transformer {
    public encode(data: Data): string {
        return JSON.stringify({page: data.page});
    }

    public parse(json: string | null): Data {
        if (json === null) return {page: Pages.LIST};
        const data = JSON.parse(json);
        return {page: get(data, 'page', Pages.LIST)};
    }
}
