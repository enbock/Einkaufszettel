import {Component} from 'react';
import SubmitIcon from './Artefacts/SubmitIcon.svg';
import EntryModel from './EntryModel';
import {EntryEntityId} from '../ListStorage/EntryEntity';

export interface Adapter {
  onEntryButtonClick(id: EntryEntityId): void;
}

interface Properties {
  adapter: Adapter,
  model: EntryModel
}

interface State {
}

export default class Entry extends Component<Properties, State> {
  public render(): JSX.Element {
    const model: EntryModel = this.props.model;
    return (
      <list-entity>
        <list-label>
          {model.label}
        </list-label>
        <button onClick={() => this.props.adapter.onEntryButtonClick(model.id)}>
          <img src={SubmitIcon} alt="Übernehmen"/>
        </button>
      </list-entity>
    );
  }
}
