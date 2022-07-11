import Navigation from './Navigation';
import NavigationModel from '../NavigationModel';
import TabModel from './TabModel';
import Tab from './Tab';
import NavigationAdapter from '../NavigationAdapter';
import {mock, MockProxy} from 'jest-mock-extended';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import {mock as mockComponent} from '@enbock/ts-jsx/Component';
import {fireEvent} from '@testing-library/dom';

mockComponent(Tab);

describe(Navigation, function () {
    let model: NavigationModel,
        adapter: NavigationAdapter & MockProxy<NavigationAdapter>
    ;
    beforeEach(function () {
        model = new NavigationModel();
        adapter = mock<NavigationAdapter>();
    });

    function createUi(): HTMLElement {
        ViewInjection(Navigation, adapter);
        const view: Navigation = TestRenderer.render(<Navigation/>) as Navigation;
        view.model = model;

        return view;
    }

    it('should display the navigation tab', function () {
        const tab: TabModel = new TabModel();
        tab.label = 'test::tabButton:';
        model.navigationTabs = [tab];

        const result: HTMLElement = createUi();

        expect(result).not.toContainHTML('class="active"');
        expect(result).toContainHTML('test::Tab:');
        expect(result).toContainHTML('test::tabButton:');
    });

    it('should click the undo button', async function () {
        model.undoEnabled = true;
        const result: HTMLElement = createUi();
        fireEvent.click(result.querySelector('button[name="undo"]') as Element);
        expect(adapter.onUndoClick).toBeCalled();
    });

    it('should disable the undo button', async function () {
        model.undoEnabled = false;
        const result: HTMLElement = createUi();
        expect(result).toContainHTML('<button disabled="true" name="undo"');
    });
});
