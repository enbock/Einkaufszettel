import FileUploadHandler from './FileUploadHandler';
import Adapter from 'Application/Setting/Adapter';
import ImportUseCase from 'Core/Setting/ImportUseCase/ImportUseCase';
import {PresentDataCallback} from 'Application/ControllerHandler';
import NavigationAdapter from 'Application/Navigation/NavigationAdapter';
import BuyingListAdapter from 'Application/BuyingList/BuyingListAdapter';
import PrimaryInputAdapter from 'Application/PrimaryInput/PrimaryInputAdapter';
import createSpy = jasmine.createSpy;
import {SystemTabs} from 'Core/Navigation/TabEntity';

describe('FileUploadHandler', function (): void {
    let fileUploadHandler: FileUploadHandler,
        adapter: Mocked<Adapter>,
        importUseCase: Mocked<ImportUseCase>,
        presentData: PresentDataCallback,
        navigationAdapter: Mocked<NavigationAdapter>,
        buyingListAdapter: Mocked<BuyingListAdapter>,
        primaryInputAdapter: Mocked<PrimaryInputAdapter>
    ;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        importUseCase = mock<ImportUseCase>();
        presentData = createSpy();
        navigationAdapter = mock<NavigationAdapter>();
        buyingListAdapter = mock<BuyingListAdapter>();
        primaryInputAdapter = mock<PrimaryInputAdapter>();

        fileUploadHandler = new FileUploadHandler(
            adapter,
            importUseCase,
            navigationAdapter,
            buyingListAdapter,
            primaryInputAdapter
        );
    });

    it('should upload a file', async function (): Promise<void> {
        const file: File = <MockedObject>'test::file';

        await fileUploadHandler.initialize(presentData);
        await adapter.onUpload(file);

        expect(importUseCase.upload).toHaveBeenCalledWith({file: file});
        expect(presentData).toHaveBeenCalled();
        expect(navigationAdapter.onNavigationClick).toHaveBeenCalledWith(SystemTabs.EntireList);
        expect(buyingListAdapter.refresh).toHaveBeenCalled();
        expect(primaryInputAdapter.refresh).toHaveBeenCalled();
    });
});
