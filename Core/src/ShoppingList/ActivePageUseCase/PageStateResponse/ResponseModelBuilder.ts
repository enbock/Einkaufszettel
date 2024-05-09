import ResponseBuilder from './ResponseBuilder';
import PageStateResponse from './PageStateResponse';
import PageStateResponseModel from './PageStateResponseModel';

export default class ResponseModelBuilder implements ResponseBuilder {
    public createPageStateResponse(): PageStateResponse {
        return new PageStateResponseModel();
    }
}
