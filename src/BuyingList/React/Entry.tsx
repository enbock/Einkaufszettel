import {Component} from 'react';
import SubmitIcon from './Artefacts/SubmitIcon.svg';
import EntryModel from './EntryModel';
import {EntryId} from '../../ListStorage/EntryEntity';

export interface Adapter {
  onEntryButtonClick(id: EntryId): void;

  onSelectClick(id: EntryId): void;
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
    const adapter = this.props.adapter;
    return (
      <list-entity>
        <list-label onClick={() => adapter.onSelectClick(model.id)}>
          {model.label}
        </list-label>
        <button onClick={() => adapter.onEntryButtonClick(model.id)}>
          <img src={SubmitIcon} alt="Übernehmen"/>
        </button>
      </list-entity>
    );
  }
}
