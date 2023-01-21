import Component from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Styles from './ShoppingList.css';
import Navigation from '../../Navigation/View/Navigation';
import PrimaryInput from '../../PrimaryInput/View/PrimaryInput';
import RootView from '../../RootView';
import ShoppingListModel from './ShoppingListModel';
import BuyingList from '../../BuyingList/View/BuyingList';
import Setting from '../../Setting/View/Setting';

export interface Properties {
}

export default class ShoppingList extends Component<Properties> implements RootView {
    private modelInstance: ShoppingListModel = new ShoppingListModel();

    public set model(value: ShoppingListModel) {
        this.modelInstance = value;
        this.renderShadow();
    }

    public render(): ShadowDomElement | ShadowDomElement[] {
        return (
            <>
                <style>{Styles}</style>
                <Navigation/>
                {this.modelInstance.showBuyingList ? <PrimaryInput/> : <></>}
                {this.modelInstance.showBuyingList ? <BuyingList/> : <></>}
                {this.modelInstance.showSetting ? <Setting/> : <></>}
            </>
        );
    }
}
