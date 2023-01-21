import PageChangeRequest from './PageChangeRequest';
import Pages from '../Pages';

export default class PageChangeRequestModel implements PageChangeRequest {
    constructor(
        public page: Pages
    ) {
    }
}
