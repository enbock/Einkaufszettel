import ShoppingList from './ShoppingList';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import {mock as mockComponent} from '@enbock/ts-jsx/Component';
import Navigation from '../../Navigation/View/Navigation';
import PrimaryInput from '../../PrimaryInput/View/PrimaryInput';
import BuyingList from '../../BuyingList/View/BuyingList';
import ShoppingListModel from './ShoppingListModel';
import Setting from '../../Setting/View/Setting';

mockComponent(Navigation);
mockComponent(PrimaryInput);
mockComponent(BuyingList);
mockComponent(Setting);

describe(ShoppingList, function () {
    let model: ShoppingListModel;

    beforeEach(function () {
        model = new ShoppingListModel();
    });

    function createUi(): HTMLElement {
        const view: ShoppingList = TestRenderer.render(<ShoppingList/>) as ShoppingList;
        view.model = model;

        return view;
    }

    it('should show main components', function () {
        const result: HTMLElement = createUi();

        expect(result).toContainHTML('test::Navigation:');
    });

    it('should show BuyingList when showBuyingList is true', function () {
        model.showBuyingList = true;

        const result: HTMLElement = createUi();

        expect(result).toContainHTML('test::PrimaryInput:');
        expect(result).toContainHTML('test::BuyingList:');
        expect(result).not.toContainHTML('test::Setting:');
    });

    it('should show Setting when showSetting is true', function () {
        model.showSetting = true;

        const result: HTMLElement = createUi();

        expect(result).toContainHTML('test::Setting:');
        expect(result).not.toContainHTML('test::PrimaryInput:');
        expect(result).not.toContainHTML('test::BuyingList:');
    });
});
