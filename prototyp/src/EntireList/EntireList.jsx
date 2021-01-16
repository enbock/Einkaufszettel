import React, {Component} from 'react';
import './EntireList.css';
import SubmitIcon from './SubmitIcon.svg';

export default class EntireList extends Component {
  render() {
    const entireList = [
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
    ];

    return <entire-list>
      <entity-list>
        {entireList.map((label) => (
          <list-entity>
            <list-label>
              {label}
            </list-label>
            <button name="submit">
              <img src={SubmitIcon} alt="Übernehmen"/>
            </button>
          </list-entity>
        ))}
      </entity-list>
      <visual-background />
    </entire-list>;
  }
}
