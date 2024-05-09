import BuyingList from './BuyingList';
import BuyingListModel, {EntryModel} from './BuyingListModel';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import {fireEvent} from '@testing-library/dom';
import BuyingListAdapter from '../BuyingListAdapter';

describe('BuyingList', function (): void {
    let adapter: Mocked<BuyingListAdapter>,
        model: BuyingListModel
    ;

    beforeEach(function (): void {
        adapter = mock<BuyingListAdapter>();
        model = new BuyingListModel();
    });

    function renderUi(): HTMLElement {
        ViewInjection(BuyingList, adapter);
        const view: BuyingList = TestRenderer.render(<BuyingList/>) as BuyingList;
        view.model = model;

        return view;
    }

    it('should show an entry', async function (): Promise<void> {
        const entry = new EntryModel();
        entry.label = 'test::flour:';
        model.list = [entry];
        const result: HTMLElement = renderUi();
        expect(result.innerHTML).toContain('test::flour:');
    });

    it('should trigger the adapter on click of the button', async function (): Promise<void> {
        const entry = new EntryModel();
        entry.id = 'test::id:';
        model.list = [entry];

        const result: HTMLElement = renderUi();

        const button: Element = result.getElementsByTagName('button').item(0) as Element;
        fireEvent.click(button);

        expect(adapter.onEntryButtonClick).toHaveBeenCalledWith('test::id:');
    });

    it('should trigger the adapter on click of the label', async function (): Promise<void> {
        const entry = new EntryModel();
        entry.id = 'test::id:';
        model.list = [entry];

        const result: HTMLElement = renderUi();

        const button: Element = result.getElementsByTagName('list-label').item(0) as Element;
        fireEvent.click(button);

        expect(adapter.onSelectClick).toHaveBeenCalledWith('test::id:');
    });
});
