import NavigationInteractor, {ActivateTabRequest, LoadResponse} from './NavigationInteractor';
import StateStorage from 'Core/Navigation/StateStorage';
import ConfigLoader from 'Core/Navigation/Config/ConfigLoader';
import UndoStorage from 'Core/Undo/UndoStorage';

describe('NavigationInteractor', function (): void {
    let interactor: NavigationInteractor,
        memory: Mocked<StateStorage>,
        configLoader: Mocked<ConfigLoader>,
        undoStorage: Mocked<UndoStorage>
    ;

    beforeEach(function (): void {
        memory = mock<StateStorage>();
        configLoader = mock<ConfigLoader>();
        undoStorage = mock<UndoStorage>();

        interactor = new NavigationInteractor(
            memory,
            configLoader,
            undoStorage
        );
    });

    it('should switch the active list', async function (): Promise<void> {
        const request: ActivateTabRequest = new ActivateTabRequest();
        request.newTabId = 'test::newTabId:';

        interactor.activateTab(request);

        expect(memory.storeActiveTab).toHaveBeenCalledWith('test::newTabId:');
    });

    it('should load the tabs inclusive active one', async function (): Promise<void> {
        memory.getActiveTab.and.returnValue('test::activeTabId');
        configLoader.loadTabsFromConfig.and.returnValue(<MockedObject>'test::tabs:');
        undoStorage.hasItems.and.returnValue(true);

        const result: LoadResponse = interactor.loadTabs();

        expect(result.activateTab).toBe('test::activeTabId');
        expect(result.tabs).toBe(<MockedObject>'test::tabs:');
        expect(result.hasUndoAvailable).toBeTruthy();
    });
});
