import ShoppingList from './ShoppingList';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import {mock as mockComponent} from '@enbock/ts-jsx/Component';
import Navigation from '../../Navigation/View/Navigation';
import PrimaryInput from '../../PrimaryInput/View/PrimaryInput';
import BuyingList from '../../BuyingList/View/BuyingList';

mockComponent(Navigation);
mockComponent(PrimaryInput);
mockComponent(BuyingList);

describe(ShoppingList, function () {
    function createUi(): HTMLElement {
        ViewInjection(ShoppingList);
        return TestRenderer.render(<ShoppingList/>);
    }

    it('should show main components', function () {
        const result: HTMLElement = createUi();

        expect(result).toContainHTML('test::Navigation:');
        expect(result).toContainHTML('test::PrimaryInput:');
        expect(result).toContainHTML('test::BuyingList:');
    });
});
