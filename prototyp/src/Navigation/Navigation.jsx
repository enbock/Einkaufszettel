import React, {Component} from 'react';
import './Navigation.css';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entireListActive: true,
      shoppingListActive: false
    };
    this.boundFlipActive = this.flipActive.bind(this);
  }

  flipActive() {
    this.setState(
      {
        entireListActive: this.state.entireListActive === false,
        shoppingListActive: this.state.shoppingListActive === false
      }
    );
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
