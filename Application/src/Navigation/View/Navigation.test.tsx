import Navigation from './Navigation';
import NavigationModel from './NavigationModel';
import TabModel from './TabModel';
import NavigationAdapter from '../NavigationAdapter';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import {fireEvent} from '@testing-library/dom';
import Tab from 'Application/Navigation/View/Tab';

describe('Navigation', function (): void {
    let model: NavigationModel,
        adapter: Mocked<NavigationAdapter>
    ;

    beforeEach(function (): void {
        mockModule(
            'Application/Navigation/View/Tab',
            function factory(module: any): Object {
                const Component: typeof Tab = module.default;
                return {
                    default: class MockedTab extends Component {
                        public render(): JSX.Element {
                            this.innerHTML =
                                'test::Tab:[' +
                                JSON.stringify(this.props.model) +
                                ',' +
                                String(this.props.adapter) +
                                ']';
                            return '';
                        }
                    }
                };
            }
        );

        model = new NavigationModel();
        adapter = mock<NavigationAdapter>();
    });

    afterEach(function (): void {
        restoreModules();
    });

    function createUi(): HTMLElement {
        ViewInjection(Navigation, adapter);
        const view: Navigation = TestRenderer.render(<Navigation/>) as Navigation;
        view.model = model;

        return view;
    }

    it('should display the navigation tab', async function (): Promise<void> {
        const tab: TabModel = new TabModel();
        tab.label = 'test::tabButton:';
        model.navigationTabs = [tab];

        const result: HTMLElement = createUi();

        expect(result.innerHTML).not.toContain('class="active"');
        expect(result.innerHTML).toContain('test::Tab:');
        expect(result.innerHTML).toContain('test::tabButton:');
    });

    it('should click the undo button', async function () {
        model.undoEnabled = true;
        const result: HTMLElement = createUi();
        fireEvent.click(result.querySelector('button[name="undo"]') as Element);
        expect(adapter.onUndoClick).toHaveBeenCalled();
    });

    it('should disable the undo button', async function () {
        model.undoEnabled = false;
        const result: HTMLElement = createUi();
        expect(result.innerHTML).toContain('<button name="undo" disabled="true"');
    });

    it('should click the settings button', async function () {
        const result: HTMLElement = createUi();
        fireEvent.click(result.querySelector('button[name="settings"]') as Element);
        expect(adapter.onSettingClick).toHaveBeenCalled();
    });
});
