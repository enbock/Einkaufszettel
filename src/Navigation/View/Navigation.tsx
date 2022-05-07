import './Navigation.css';
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

    render() {
        return (
            <navigation is="navigation">
                {this.modelInstance.navigationTabs.map(this.renderTab.bind(this))}
            </navigation>
        );
    }

    public renderTab(model: TabModel, index: number) {
        return (
            <Tab
                key={'NavigationTab' + index}
                adapter={this.adapter}
                model={model}
            />
        );
    }
}
