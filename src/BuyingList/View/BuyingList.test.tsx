import BuyingList from './BuyingList';
import BuyingListModel, {EntryModel} from './BuyingListModel';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import {fireEvent} from '@testing-library/dom';
import BuyingListAdapter from '../BuyingListAdapter';
import {mock, MockProxy} from 'jest-mock-extended';

describe(BuyingList, function () {
    let adapter: BuyingListAdapter & MockProxy<BuyingListAdapter>,
        model: BuyingListModel
    ;

    beforeEach(function () {
        adapter = mock<BuyingListAdapter>();
        model = new BuyingListModel();
    });

    function renderUi(): HTMLElement {
        ViewInjection(BuyingList, adapter);
        const view: BuyingList = TestRenderer.render(<BuyingList/>) as BuyingList;
        view.model = model;

        return view;
    }

    it('should show an entry', function () {
        const entry = new EntryModel();
        entry.label = 'test::flour:';
        model.list = [entry];
        const result: HTMLElement = renderUi();
        expect(result).toContainHTML('test::flour:');
    });

    it('should trigger the adapter on click of the button', function () {
        const entry = new EntryModel();
        entry.id = 'test::id:';
        model.list = [entry];

        const result: HTMLElement = renderUi();

        const button: Element = result.getElementsByTagName('button').item(0) as Element;
        fireEvent.click(button);

        expect(adapter.onEntryButtonClick).toBeCalledWith('test::id:');
    });

    it('should trigger the adapter on click of the label', function () {
        const entry = new EntryModel();
        entry.id = 'test::id:';
        model.list = [entry];

        const result: HTMLElement = renderUi();

        const button: Element = result.getElementsByTagName('list-label').item(0) as Element;
        fireEvent.click(button);

        expect(adapter.onSelectClick).toBeCalledWith('test::id:');
    });
});
