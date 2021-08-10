import React, {Component} from 'react';
import './Navigation.css';
import NavigationModel from '../NavigationModel';
import Container from '../DependencyInjection/Container';
import Tab, {Adapter as TabAdapter} from './Tab';
import TabModel from './TabModel';

export interface Adapter extends TabAdapter {
}

export interface Properties {
}

interface State {
  model: NavigationModel;
}

export default class Navigation extends Component<Properties, State> {
  private readonly adapter: Adapter;

  constructor(props: Readonly<Properties>) {
    super(props);
    this.adapter = Container.adapter;
    this.state = {model: new NavigationModel()};
  }

  public set model(value: NavigationModel) {
    this.setState({model: value});
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
