import NavigationInteractor, {ActivateTabRequest, LoadResponse} from './NavigationInteractor';
import Memory from './Memory/Memory';
import {mock, MockProxy} from 'jest-mock-extended';
import ConfigLoader from './Config/ConfigLoader';
import UndoStorage from '../Undo/Storage/UndoStorage';

describe(NavigationInteractor, function () {
    let interactor: NavigationInteractor,
        memory: Memory & MockProxy<Memory>,
        configLoader: ConfigLoader & MockProxy<ConfigLoader>,
        undoStorage: UndoStorage & MockProxy<UndoStorage>
    ;

    beforeEach(function () {
        memory = mock<Memory>();
        configLoader = mock<ConfigLoader>();
        undoStorage = mock<UndoStorage>();

        interactor = new NavigationInteractor(
            memory,
            configLoader,
            undoStorage
        );
    });

    it('should switch the active list', function () {
        const request: ActivateTabRequest = new ActivateTabRequest();
        request.newTabId = 'test::newTabId:';

        interactor.activateTab(request);

        expect(memory.storeActiveTab).toBeCalledWith('test::newTabId:');
    });

    it('should load the tabs inclusive active one', function () {
        memory.getActiveTab.mockReturnValueOnce('test::activeTabId');
        configLoader.loadTabsFromConfig.mockReturnValueOnce('test::tabs:' as MockedObject);
        undoStorage.hasItems.mockReturnValueOnce(true);

        const result: LoadResponse = interactor.loadTabs();

        expect(result.activateTab).toBe('test::activeTabId');
        expect(result.tabs).toBe('test::tabs:');
        expect(result.hasUndoAvailable).toBeTruthy();
    });
});
