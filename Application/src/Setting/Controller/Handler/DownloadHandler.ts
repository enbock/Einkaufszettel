import {PresentDataCallback} from 'Application/ControllerHandler';
import Adapter from 'Application/Setting/Adapter';
import DownloadUseCase from 'Core/Setting/DownloadUseCase/DownloadUseCase';

export default class DownloadHandler {
    private presentData: PresentDataCallback = () => false as never;

    constructor(
        private adapter: Adapter,
        private downloadUseCase: DownloadUseCase
    ) {
    }

    public async initialize(presentData: PresentDataCallback): Promise<void> {
        this.presentData = presentData;

        this.adapter.onDownload = () => this.initiateDownload();
    }

    private async initiateDownload(): Promise<void> {
        await this.downloadUseCase.startDownload();
        void this.presentData();
    }
}
