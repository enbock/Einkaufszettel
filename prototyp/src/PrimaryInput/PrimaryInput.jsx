import React, {Component, createRef} from 'react';
import DiscardIcon from './DiscardIcon.svg'
import SubmitIcon from './SubmitIcon.svg'
import './PrimaryInput.css';

export default class PrimaryInput extends Component {
  constructor(props) {
    super(props);
    this.inputReference = createRef();
  }

  clearField() {
    this.inputReference.current.value = '';
    this.inputReference.current.focus();
  }

  render() {
    return <sl-primary-input>
      <input-frame>
        <input name="editLine" ref={this.inputReference}/>
        <button name="submit" onClick={this.clearField.bind(this)}>
          <img src={SubmitIcon} alt="Übernehmen"/>
        </button>
        <button name="discard" onClick={this.clearField.bind(this)}>
          <img src={DiscardIcon} alt="Verwerfen"/>
        </button>
      </input-frame>
    </sl-primary-input>;
  }
}
