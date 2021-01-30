import React, {Component} from 'react';
import './Navigation.css';
import PropTypes from 'prop-types';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entireListActive: true,
      shoppingListActive: false
    };
    this.boundFlipActive = this.flipActive.bind(this);
  }

  static get propTypes() {
    return {
      adapter: PropTypes.object.isRequired
    }
  }

  static get adapter() {
    return {
      onNavigationClick: () => {}
    }
  }

  flipActive() {
    const entireListActive = this.state.entireListActive === false;
    this.setState(
      {
        entireListActive: entireListActive,
        shoppingListActive: this.state.shoppingListActive === false
      }
    );
    this.props.adapter.onNavigationClick(entireListActive ? 'entireList' : 'shoppingList')
  }

  render() {
    return (
      <sl-navigation>
        <button
          className={this.state.entireListActive ? 'active' : null}
          onClick={this.boundFlipActive}
        >
          Gesamtliste
        </button>
        <button
          className={this.state.shoppingListActive ? 'active' : null}
          onClick={this.boundFlipActive}
        >
          Einkaufszettel
        </button>
      </sl-navigation>
    );
  }
}
