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
        'Zucker',
        'Mehl',
        'Honig',
        'XXÄÄyyy',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345',
        'ABCD12345'
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
