import CSS from './Navigation.css';
import NavigationModel from '../NavigationModel';
import Tab from './Tab';
import TabModel from './TabModel';
import Component from '@enbock/ts-jsx/Component';
import RootView from '../../RootView';
import NavigationAdapter from './NavigationAdapter';

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
        return <>
            <style>{CSS}</style>
            {this.modelInstance.navigationTabs.map(this.renderTab.bind(this))}
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
