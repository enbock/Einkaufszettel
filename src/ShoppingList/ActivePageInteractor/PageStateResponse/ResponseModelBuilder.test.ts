import ResponseModelBuilder from './ResponseModelBuilder';
import PageStateResponseModel from './PageStateResponseModel';
import PageStateResponse from './PageStateResponse';

describe(ResponseModelBuilder, function (): void {
    let builder: ResponseModelBuilder;

    beforeEach(function (): void {
        builder = new ResponseModelBuilder();
    });

    it('should create a new instance of PageStateResponseModel', function (): void {
        const response: PageStateResponse = builder.createPageStateResponse();
        expect(response).toBeInstanceOf(PageStateResponseModel);
    });
});
