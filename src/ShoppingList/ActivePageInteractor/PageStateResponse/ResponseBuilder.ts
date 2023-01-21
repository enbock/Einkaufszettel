import PageStateResponse from './PageStateResponse';

export default interface ResponseBuilder {
    createPageStateResponse(): PageStateResponse;
}
