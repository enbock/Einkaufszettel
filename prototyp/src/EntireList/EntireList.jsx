import React, {Component} from 'react';
import './EntireList.css';
import SubmitIcon from './SubmitIcon.svg';
import PropTypes from 'prop-types';

export default class EntireList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeList: 'entireList',
      entireList: [
        'alkoholfrei Bier 6',
        'Alufolie',
        'Badreiniger Frosch',
        'Baguetts',
        'Bowlenobst',
        'Bowlenwein',
        'Broccoli',
        'Bratwurst',
        'Brötchen',
        'Butterbrotpapier',
        'Buttaris',
        'Butter',
        'Buttermilch',
        'Cola',
        'Corega Tabs',
        'Cranberrys',
        'Dinkelmehl 630',
        'Ducksteiner',
        'Eier',
        'Eierlikör',
        'Eis',
        'Essigessenz',
        'Fisch',
        'Gelierzucker',
        'Glühwein',
        'Grappa',
        'Gurken',
        'Haarwäsche',
        'Hackepeter',
        'Haferflocken',
        'Handseife',
        'Honig',
        'hot chili',
        'Lauchzwiebel',
        'Kaffeefilter',
        'Käse',
        'Kerzen',
        'Knäckebrot',
        'Kohlenanzünder',
        'Küchenrolle',
        'Kümmel',
        'Kürbiskerne',
        'Kürbiskernöl',
        'Milch',
        'Mohrrüben',
        'Mozarella',
        'Müllbeutel 10l',
        'Müsli',
        'Naschereien',
        'Nudeln',
        'Obst',
        'Parmesan',
        'Pfefferminztee',
        'Pflaumen',
        'Porree',
        'Quark',
        'Reis',
        'Reiswaffeln',
        'Rosenkohl',
        'Rum',
        'Salz',
        'Sekt',
        'Samen',
        'Sauerkraut',
        'Schlagsahne',
        'Schorle',
        'Schwarzbier',
        'Sensodyne',
        'Sekt',
        'Sellerie',
        'Slipeinlagen',
        'Streichhölzer',
        'Suppenhuhn',
        'Taschentücher',
        'Toilettenpapier',
        'Pfefferminztee',
        'Vogelfutter',
        'Wasser',
        'WC Reiniger',
        'Wein',
        'Wurst',
        'Zucker',
        'Zitronensaft'
      ],
      shoppingList: []
    };
  }

  static get propTypes() {
    return {
      adapter: PropTypes.object.isRequired
    };
  }

  componentDidMount() {
    this.props.adapter.onNavigationClick = this.switchList.bind(this);
  }

  switchList(activeList) {
    this.setState({activeList: activeList});
  }

  removeFromList(index) {
    const list = this.state.activeList === 'entireList' ? this.state.entireList : this.state.shoppingList;
    const entireList = this.state.entireList;
    const shoppingList = this.state.shoppingList;
    const removedItem = list.splice(index, 1);

    if (this.state.activeList === 'entireList') {
      shoppingList.push(removedItem[0]);
      this.setState({entireList: list, shoppingList: shoppingList});
    } else {
      entireList.unshift(removedItem[0]);
      this.setState({entireList: entireList, shoppingList: list});
    }
  }

  render() {
    const list = this.state.activeList === 'entireList' ? this.state.entireList : this.state.shoppingList;

    return <entire-list>
      <entity-list>
        {list.map((label, index) => (
          <list-entity key={'list-entry-' + index}>
            <list-label>
              {label}
            </list-label>
            <button onClick={() => this.removeFromList(index)}>
              <img src={SubmitIcon} alt="Übernehmen"/>
            </button>
          </list-entity>
        ))}
      </entity-list>
      <visual-background/>
    </entire-list>;
  }
}
