import ControllerHandler, {PresentDataCallback} from 'Application/ControllerHandler';
import Adapter from 'Application/Setting/Adapter';
import ImportUseCase from 'Core/Setting/ImportUseCase/ImportUseCase';
import NavigationAdapter from 'Application/Navigation/NavigationAdapter';
import {SystemTabs} from 'Core/Navigation/TabEntity';
import BuyingListAdapter from 'Application/BuyingList/BuyingListAdapter';
import PrimaryInputAdapter from 'Application/PrimaryInput/PrimaryInputAdapter';

export default class FileUploadHandler implements ControllerHandler {
    private presentData: PresentDataCallback = () => false as never;

    constructor(
        private adapter: Adapter,
        private importUseCase: ImportUseCase,
        private navigationAdapter: NavigationAdapter,
        private buyingListAdapter: BuyingListAdapter,
        private primaryInputAdapter: PrimaryInputAdapter
    ) {
    }

    public async initialize(presentData: PresentDataCallback): Promise<void> {
        this.presentData = presentData;

        this.adapter.onUpload = (file) => this.handleFileUpload(file);
    }

    private async handleFileUpload(file: File): Promise<void> {
        await this.importUseCase.upload({file: file});
        await this.presentData();

        void this.navigationAdapter.onNavigationClick(SystemTabs.EntireList);
        void this.buyingListAdapter.refresh();
        void this.primaryInputAdapter.refresh();
    }
}
