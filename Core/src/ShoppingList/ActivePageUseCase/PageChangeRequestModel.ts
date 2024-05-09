import PageChangeRequest from './PageChangeRequest';
import Pages from 'Core/ShoppingList/Pages';

export default class PageChangeRequestModel implements PageChangeRequest {
    constructor(
        public page: Pages
    ) {
    }
}
