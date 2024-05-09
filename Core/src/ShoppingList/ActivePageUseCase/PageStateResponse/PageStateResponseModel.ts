import PageStateResponse from './PageStateResponse';
import Pages from 'Core/ShoppingList/Pages';

export default class PageStateResponseModel implements PageStateResponse {
    public activePage: Pages = Pages.LIST;
}
