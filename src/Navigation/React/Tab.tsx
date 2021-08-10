import React, {Component} from 'react';
import TabModel from './TabModel';

export interface Adapter {
  onNavigationClick(activeList: string): void;
}

interface Properties {
  model: TabModel,
  adapter: Adapter
}

interface State {
}

export default class Tab extends Component<Properties, State> {
  public render() {
    return (
      <button
        className={this.props.model.isActive ? 'active' : undefined}
        onClick={() => this.props.adapter.onNavigationClick(this.props.model.name)}
      >
        {this.props.model.label}
      </button>
    );
  }
}
