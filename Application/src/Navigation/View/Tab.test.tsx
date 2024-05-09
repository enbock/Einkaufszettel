import Tab from './Tab';
import TabModel from './TabModel';
import {fireEvent} from '@testing-library/dom';
import NavigationAdapter from '../NavigationAdapter';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';

describe('Tab', function (): void {
    let adapter: NavigationAdapter = mock<NavigationAdapter>(),
        model: TabModel
    ;

    beforeEach(function (): void {
        model = new TabModel();
    });

    function createUi(): HTMLElement {
        return TestRenderer.render(<Tab model={model} adapter={adapter}/>);
    }

    it('should display the navigation tab', async function (): Promise<void> {
        model.isActive = false;
        model.label = 'test::label:';

        const result: HTMLElement = createUi();

        expect(result.innerHTML).not.toContain('class="active"');
        expect(result.textContent).toContain('test::label:');
    });

    it('should mark the active tab', async function (): Promise<void> {
        model.isActive = true;

        const result: HTMLElement = createUi();

        expect(result.innerHTML).toContain('class="active"');
    });

    it('should run adapter function with tab name on click', async function (): Promise<void> {
        model.name = 'test::tabName:';

        const result: HTMLElement = createUi();

        fireEvent.click(result.getElementsByTagName('button').item(0)!);

        expect(adapter.onNavigationClick).toHaveBeenCalledWith('test::tabName:');
    });
});
