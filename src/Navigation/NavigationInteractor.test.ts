import NavigationInteractor, {ActivateTabRequest, LoadResponse} from './NavigationInteractor';
import Memory from './Memory/Memory';
import {mock, MockProxy} from 'jest-mock-extended';
import ConfigLoader from './Config/ConfigLoader';
import TabEntity from './TabEntity';

describe(NavigationInteractor, function () {
    let interactor: NavigationInteractor,
        memory: Memory & MockProxy<Memory>,
        configLoader: ConfigLoader & MockProxy<ConfigLoader>
    ;

    beforeEach(function () {
        memory = mock<Memory>();
        configLoader = mock<ConfigLoader>();
        interactor = new NavigationInteractor(memory, configLoader);
    });

    it('should switch the active list', function () {
        const request: ActivateTabRequest = new ActivateTabRequest();
        request.newTabId = 'test::newTabId:';

        interactor.activateTab(request);

        expect(memory.storeActiveTab).toBeCalledWith('test::newTabId:');
    });

    it('should load the tabs inclusive active one', function () {
        memory.getActiveTab.mockReturnValueOnce('test::activeTabId');
        const tab: TabEntity = new TabEntity();
        tab.name = 'test::tab:';
        const tabs: TabEntity[] = [tab];
        configLoader.loadTabsFromConfig.mockReturnValueOnce(tabs);

        const result: LoadResponse = interactor.loadTabs();

        const expectedResponse: LoadResponse = new LoadResponse();
        expectedResponse.activateTab = 'test::activeTabId';
        expectedResponse.tabs = tabs;

        expect(result).toEqual(expectedResponse);
    });
});
