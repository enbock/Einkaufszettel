import DownloadHandler from './DownloadHandler';
import Adapter from 'Application/Setting/Adapter';
import DownloadUseCase from 'Core/Setting/DownloadUseCase/DownloadUseCase';
import {PresentDataCallback} from 'Application/ControllerHandler';
import createSpy = jasmine.createSpy;

describe('DownloadHandler', function (): void {
    let downloadHandler: DownloadHandler,
        adapter: Mocked<Adapter>,
        downloadUseCase: Mocked<DownloadUseCase>,
        presentData: PresentDataCallback
    ;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        downloadUseCase = mock<DownloadUseCase>();
        presentData = createSpy();

        downloadHandler = new DownloadHandler(
            adapter,
            downloadUseCase
        );
    });

    it('should initiate download and present data', async function (): Promise<void> {
        await downloadHandler.initialize(presentData);
        await adapter.onDownload();

        expect(downloadUseCase.startDownload).toHaveBeenCalled();
        expect(presentData).toHaveBeenCalled();
    });
});
