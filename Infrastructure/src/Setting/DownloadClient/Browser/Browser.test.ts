import Browser from './Browser';
import Encoder from 'Infrastructure/Setting/DownloadClient/Browser/Encoder';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

describe('Browser', function (): void {
    let client: Browser,
        encoder: Mocked<Encoder>,
        document: Mocked<Document>
    ;

    beforeEach(function (): void {
        encoder = mock<Encoder>();
        document = mock<Document>();
        (document as any).body = mock<Body>();

        client = new Browser(
            encoder,
            document
        );
    });

    it('should create a downloadable link and trigger download', function (): void {
        const entireList: Array<EntryEntity> = <MockedObject>'test::entireList';
        const shoppingList: Array<EntryEntity> = <MockedObject>'test::shoppingList';
        const json: string = JSON.stringify({entireList, shoppingList});

        encoder.encode.and.returnValue(json);
        const clickSpy: Spy = createSpy('click');

        document.createElement.and.callFake(function (tagName: string): HTMLElement {
            return {
                href: '',
                download: '',
                click: clickSpy
            } as unknown as HTMLAnchorElement;
        });

        client.download(entireList, shoppingList);

        expect(encoder.encode).toHaveBeenCalledWith(entireList, shoppingList);
        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(document.body.appendChild).toHaveBeenCalledTimes(1);
        expect(clickSpy).toHaveBeenCalledTimes(1);
        expect(document.body.removeChild).toHaveBeenCalledTimes(1);
    });
});
