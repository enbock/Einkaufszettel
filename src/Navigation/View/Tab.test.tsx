import Tab from './Tab';
import TabModel from './TabModel';
import {mock} from 'jest-mock-extended';
import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import {fireEvent} from '@testing-library/dom';
import NavigationAdapter from './NavigationAdapter';

describe(Tab, function () {
    let adapter: NavigationAdapter = mock<NavigationAdapter>(),
        model: TabModel
    ;

    beforeEach(function () {
        model = new TabModel();
    });

    function createUi(): HTMLElement {
        ViewInjection(Tab, adapter);
        const view: Tab = ShadowRenderer.render(<Tab model={model} adapter={adapter}/>) as Tab;

        return view.shadowRoot!.firstElementChild as HTMLElement;
    }

    it('should display the navigation tab', function () {
        model.isActive = false;
        model.label = 'test::label:';

        const result: HTMLElement = createUi();

        expect(result).not.toContainHTML('class="active"');
        expect(result).toHaveTextContent('test::label:');
    });

    it('should mark the active tab', function () {
        model.isActive = true;

        const result: HTMLElement = createUi();

        expect(result).toContainHTML('class="active"');
    });

    it('should run adapter function with tab name on click', function () {
        model.name = 'test::tabName:';

        const result: HTMLElement = createUi();

        fireEvent.click(result);

        expect(adapter.onNavigationClick).toBeCalledWith('test::tabName:');
    });
});
