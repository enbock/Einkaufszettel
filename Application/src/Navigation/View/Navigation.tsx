import NavigationModel from './NavigationModel';
import TabModel from './TabModel';
import Component from '@enbock/ts-jsx/Component';
import RootView from '../../RootView';
import NavigationAdapter from '../NavigationAdapter';
import Styles from './Artifacts/Navigation.css';
import Tab from 'Application/Navigation/View/Tab';

export interface Properties {
}

export default class Navigation extends Component<Properties> implements RootView {
    private modelInstance: NavigationModel = new NavigationModel();

    constructor(
        props: Readonly<Properties>,
        private adapter: NavigationAdapter
    ) {
        super(props);
    }

    public set model(value: NavigationModel) {
        this.modelInstance = value;
        this.renderShadow();
    }

    render(): JSX.Element {
        const undoButtonOptions: any = {};
        if (this.modelInstance.undoEnabled == false) undoButtonOptions.disabled = true;
        return <>
            <style>{Styles}</style>
            {this.modelInstance.navigationTabs.map(this.renderTab.bind(this))}
            <menu--button-list>
                <button
                    name="settings"
                    onClick={this.adapter.onSettingClick}
                />
                <button
                    name="undo"
                    {...undoButtonOptions}
                    onClick={this.adapter.onUndoClick}
                />
            </menu--button-list>
        </>;
    }

    public renderTab(model: TabModel) {
        return (
            <Tab
                adapter={this.adapter}
                model={model}
            />
        );
    }
}
