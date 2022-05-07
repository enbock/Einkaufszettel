import Entry from './Entry';
import EntryModel from './EntryModel';
import {mock, MockProxy} from 'jest-mock-extended';
import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import {fireEvent} from '@testing-library/dom';
import BuyingListAdapter from './BuyingListAdapter';

describe(Entry, function () {
    let adapter: BuyingListAdapter & MockProxy<BuyingListAdapter>,
        model: EntryModel
    ;

    beforeEach(function () {
        adapter = mock<BuyingListAdapter>();
        model = new EntryModel();
    });

    function renderUi(): HTMLElement {
        const view: Entry = ShadowRenderer.render(<Entry adapter={adapter} model={model}/>) as Entry;
        return view.shadowRoot!.firstElementChild as HTMLElement;
    }

    it('should show an entry', function () {
        model.label = 'test::flour:';
        const result: HTMLElement = renderUi();
        expect(result).toContainHTML('test::flour:');
    });

    it('should trigger the adapter on click of the button', function () {
        model.id = 'test::id:';
        const result: HTMLElement = renderUi();
        const button: Element = result.getElementsByTagName('button').item(0) as Element;
        fireEvent.click(button);

        expect(adapter.onEntryButtonClick).toBeCalledWith('test::id:');
    });

    it('should trigger the adapter on click of the label', function () {
        model.id = 'test::id:';
        const result: HTMLElement = renderUi();
        const button: Element = result.getElementsByTagName('list-label').item(0) as Element;
        fireEvent.click(button);

        expect(adapter.onSelectClick).toBeCalledWith('test::id:');
    });
});
