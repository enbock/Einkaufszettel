import React, {ChangeEvent, Component} from 'react';
import DiscardIcon from './Artefacts/DiscardIcon.svg';
import SubmitIcon from './Artefacts/SubmitIcon.svg';
import PrimaryInputModel from './PrimaryInputModel';
import './Artefacts/PrimaryInput.css';
import Container from './DependencyInjection/Container';

export interface Adapter {
  onSubmit(): void;

  onDiscard(): void;

  onInputChange(newValue: string): void;
}

interface Properties {
}

interface State {
  model: PrimaryInputModel
}

export default class PrimaryInput extends Component<Properties, State> {
  private adapter: Adapter;

  constructor(props: Readonly<Properties>) {
    super(props);
    this.adapter = Container.adapter;
    this.state = {model: new PrimaryInputModel()};
  }

  public set model(value: PrimaryInputModel) {
    this.setState({model: value});
  }

  public componentDidMount(): void {
    Container.controller.attach(this);
  }

  public render() {
    return (
      <primary-input>
        <input-frame>
          <input name="editLine" value={this.state.model.inputValue} onChange={this.onInputChange.bind(this)}/>
          <button name="submit" onClick={() => this.adapter.onSubmit()}>
            <img src={SubmitIcon} alt="Übernehmen"/>
          </button>
          <button name="discard" onClick={() => this.adapter.onDiscard()}>
            <img src={DiscardIcon} alt="Verwerfen"/>
          </button>
        </input-frame>
      </primary-input>
    );
  }

  private onInputChange(event: ChangeEvent<HTMLInputElement>): void {
    this.adapter.onInputChange(event.target.value);
  }
}
