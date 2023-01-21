import PageStateResponse from './PageStateResponse';
import Pages from '../../Pages';

export default class PageStateResponseModel implements PageStateResponse {
    public activePage: Pages = Pages.LIST;
}
