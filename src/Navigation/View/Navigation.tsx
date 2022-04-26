import './Navigation.css';
import NavigationModel from '../NavigationModel';
import Container from '../DependencyInjection/Container';
import Tab, {Adapter as TabAdapter} from './Tab';
import TabModel from './TabModel';
import Component from '@enbock/ts-jsx/Component';

export interface Adapter extends TabAdapter {
}

export interface Properties {
}

interface State {
    model: NavigationModel;
}

export default class Navigation extends Component<Properties> {
    private readonly adapter: Adapter;
    private state: any = {}; // TODO

    constructor(props: Readonly<Properties>) {
        super(props);
        this.adapter = Container.adapter;
        this.state = {model: new NavigationModel()};
    }

    public set model(value: NavigationModel) {
        this.updateProps({model: value}); // TODO
    }

    public componentDidMount() {
        Container.controller.attach(this);
    }

    render() {
        return (
            <navigation is="navigation">
                {this.state.model.navigationTabs.map(this.renderTab.bind(this))}
            </navigation>
        );
    }

    renderTab(model: TabModel, index: number) {
        return (
            <Tab
                key={'NavigationTab' + index}
                adapter={this.adapter}
                model={model}
            />
        );
    }
}
