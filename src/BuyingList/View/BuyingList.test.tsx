import BuyingList from './BuyingList';
import BuyingListModel from './BuyingListModel';
import EntryModel from './EntryModel';
import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import mockComponent from '../../mockComponent';
import Entry from './Entry';

mockComponent(Entry);

describe(BuyingList, function () {
    it('should show the list', function () {
        const entry1: EntryModel = new EntryModel();
        entry1.id = 'id-1';
        entry1.label = 'test::entry1:';
        const entry2: EntryModel = new EntryModel();
        entry2.id = 'id-2';
        entry2.label = 'test::entry2:';
        const model: BuyingListModel = new BuyingListModel();
        model.list = [entry1, entry2];

        ViewInjection(BuyingList, 'test::Adapter:');
        const result: BuyingList = ShadowRenderer.render(<BuyingList/>) as BuyingList;
        result.model = model;

        expect(result.shadowRoot!.firstElementChild).toContainHTML('test::entry1:');
        expect(result.shadowRoot!.firstElementChild).toContainHTML('test::entry2:');
        expect(result.shadowRoot!.firstElementChild).toContainHTML('test::Adapter:');
    });
});
