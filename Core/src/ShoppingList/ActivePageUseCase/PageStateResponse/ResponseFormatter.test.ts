import ResponseFormatter from './ResponseFormatter';
import PageStateResponseModel from './PageStateResponseModel';
import Pages from 'Core/ShoppingList/Pages';
import PageStateResponse from './PageStateResponse';
import ResponseBuilder from './ResponseBuilder';

describe('ResponseFormatter', function (): void {
    let responseBuilder: Mocked<ResponseBuilder>;
    let formatter: ResponseFormatter;

    beforeEach(function (): void {
        responseBuilder = mock<ResponseBuilder>();
        formatter = new ResponseFormatter(responseBuilder);
    });

    it('should format the page state response', async function (): Promise<void> {
        const activePage: Pages = 'test::activePage:' as Pages;
        const pageStateResponse: PageStateResponseModel = new PageStateResponseModel();
        pageStateResponse.activePage = activePage;
        responseBuilder.createPageStateResponse.and.returnValue(pageStateResponse);

        const result: PageStateResponse = formatter.formatPageStateResponse(activePage);

        expect(responseBuilder.createPageStateResponse).toHaveBeenCalled();
        expect(result.activePage).toBe(activePage);
    });
});
