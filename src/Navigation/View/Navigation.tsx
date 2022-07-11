import NavigationModel from '../NavigationModel';
import Tab from './Tab';
import TabModel from './TabModel';
import Component from '@enbock/ts-jsx/Component';
import RootView from '../../RootView';
import NavigationAdapter from '../NavigationAdapter';
import Styles from './Artifacts/Navigation.css';

export interface Properties {
}

export default class Navigation extends Component<Properties> implements RootView {
    private modelInstance: NavigationModel = new NavigationModel();

    constructor(
        props: Readonly<Properties>,
        private readonly adapter: NavigationAdapter
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
            <menu>
                <button
                    name="undo"
                    onClick={this.adapter.onUndoClick}
                    {...undoButtonOptions}
                />
            </menu>
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
