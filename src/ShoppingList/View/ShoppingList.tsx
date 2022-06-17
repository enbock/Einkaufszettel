import Component from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Styles from './ShoppingList.css';
import Navigation from '../../Navigation/View/Navigation';
import PrimaryInput from '../../PrimaryInput/View/PrimaryInput';
import BuyingList from '../../BuyingList/View/BuyingList';

export interface Properties {
}

export default class ShoppingList extends Component<Properties> {
    public render(): ShadowDomElement | ShadowDomElement[] {
        return (
            <>
                <style>{Styles}</style>
                <Navigation/>
                <PrimaryInput/>
                <BuyingList/>
            </>
        );
    }
}
