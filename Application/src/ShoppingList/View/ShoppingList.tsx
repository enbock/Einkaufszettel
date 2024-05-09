import Component from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Styles from './ShoppingList.css';
import RootView from 'Application/RootView';
import ShoppingListModel from 'Application/ShoppingList/View/ShoppingListModel';
import Navigation from 'Application/Navigation/View/Navigation';
import PrimaryInput from 'Application/PrimaryInput/View/PrimaryInput';
import BuyingList from 'Application/BuyingList/View/BuyingList';
import Setting from 'Application/Setting/View/Setting';
import SettingActionBar from 'Application/Setting/View/SettingActionBar';

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
                {this.modelInstance.showSetting ? <SettingActionBar/> : <></>}
                {this.modelInstance.showSetting ? <Setting/> : <></>}
            </>
        );
    }
}
