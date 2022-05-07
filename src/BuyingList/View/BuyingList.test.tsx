import BuyingList from './BuyingList';
import BuyingListModel from './BuyingListModel';
import EntryModel from './EntryModel';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import Entry from './Entry';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import {mock} from '@enbock/ts-jsx/Component';

mock(Entry);

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
        const result: BuyingList = TestRenderer.render(<BuyingList/>) as BuyingList;
        result.model = model;

        expect(result).toContainHTML('test::entry1:');
        expect(result).toContainHTML('test::entry2:');
        expect(result).toContainHTML('test::Adapter:');
    });
});
