import Pages from '../../Pages';
import PageStateResponse from './PageStateResponse';
import ResponseBuilder from './ResponseBuilder';

export default class ResponseFormatter {
    constructor(private responseBuilder: ResponseBuilder) {
    }

    public formatPageStateResponse(activePage: Pages): PageStateResponse {
        const response: PageStateResponse = this.responseBuilder.createPageStateResponse();
        response.activePage = activePage;
        return response;
    }
}
