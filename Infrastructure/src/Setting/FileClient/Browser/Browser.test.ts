import Browser from './Browser';
import Encoder from 'Infrastructure/Setting/FileClient/Browser/Encoder';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import Parser from 'Infrastructure/Setting/FileClient/Browser/Parser';
import {ImportDto} from 'Core/Setting/FileClient';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

describe('Browser', function (): void {
    let client: Browser,
        encoder: Mocked<Encoder>,
        document: Mocked<Document>,
        parser: Mocked<Parser>,
        fileReader: Mocked<typeof FileReader>,
        fileReaderMock: Mocked<FileReader>
    ;

    beforeEach(function (): void {
        encoder = mock<Encoder>();
        document = mock<Document>();
        (document as any).body = mock<Body>();
        parser = mock<Parser>();
        fileReaderMock = mock<FileReader>();
        fileReader = <MockedObject>class MockedReader {
            constructor() {
                return fileReaderMock;
            }
        };

        client = new Browser(
            encoder,
            document,
            parser,
            fileReader
        );
    });

    it('should create a downloadable link and trigger download', function (): void {
        const entireList: Array<EntryEntity> = <MockedObject>'test::entireList';
        const shoppingList: Array<EntryEntity> = <MockedObject>'test::shoppingList';
        const json: string = JSON.stringify({entireList, shoppingList});

        encoder.encode.and.returnValue(json);
        const clickSpy: Spy = createSpy('click');

        document.createElement.and.callFake(function (_: string): HTMLElement {
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

    it('should load file content and parse it into ImportDto', async function (): Promise<void> {
        const file: File = <MockedObject>'test::file';
        const expectedDto: ImportDto = <MockedObject>'test::importDto';
        const jsonData: JsonData = 'test::data:';

        parser.parseJson.and.returnValue(expectedDto);

        const readerLoadEvent: ProgressEvent = <MockedObject>{
            type: 'load',
            target: {
                result: jsonData
            }
        };

        fileReaderMock.readAsText.and.callFake(
            function readAsText(blob: Blob, _?: string): void {
                expect(blob).toBe(file);
                (fileReaderMock as any).onload(readerLoadEvent);
            }
        );

        const result: ImportDto = await client.load(file);

        expect(parser.parseJson).toHaveBeenCalledWith(jsonData);
        expect(result).toBe(expectedDto);
    });
});
