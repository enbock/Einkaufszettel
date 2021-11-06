import React, {ChangeEvent, Component} from 'react';
import DiscardIcon from './Artefacts/DiscardIcon.svg';
import SubmitIcon from './Artefacts/SubmitIcon.svg';
import PrimaryInputModel from './PrimaryInputModel';
import './Artefacts/PrimaryInput.css';
import Container from '../DependencyInjection/Container';
import GlobalContainer from '../../DependencyInjection/Container';

export interface Adapter {
  onSubmit(): void;

  onDiscard(): void;

  onInputChange(newValue: string): void;
}

interface Properties {
}

interface State {
  model: PrimaryInputModel;
}

export default class PrimaryInput extends Component<Properties, State> {
  private adapter: Adapter;

  constructor(props: Readonly<Properties>) {
    super(props);
    this.adapter = GlobalContainer.inputAdapter;
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
          <input
            autoComplete="off"
            name="editLine" value={this.state.model.inputValue}
            onChange={this.onInputChange.bind(this)}
          />
          {this.renderSubmitButton()}
          {this.renderDiscardButton()}
        </input-frame>
      </primary-input>
    );
  }

  private renderSubmitButton(): JSX.Element | null {
    if (this.state.model.showSubmitButton === false) return <button name="placeholder"/>;

    return (
      <button name="submit" onClick={() => this.adapter.onSubmit()}>
        <img src={SubmitIcon} alt="Übernehmen"/>
      </button>
    );
  }

  private renderDiscardButton(): JSX.Element | null {
    const model = this.state.model;
    if (model.showDiscardButton === false) return null;

    return <button name="discard" onClick={() => this.adapter.onDiscard()}>
      <img src={DiscardIcon} alt={model.discardLabel}/>
    </button>;
  }

  private onInputChange(event: ChangeEvent<HTMLInputElement>): void {
    this.adapter.onInputChange(event.target.value);
  }
}
