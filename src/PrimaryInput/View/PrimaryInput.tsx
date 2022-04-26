import DiscardIcon from './Artefacts/DiscardIcon.svg';
import SubmitIcon from './Artefacts/SubmitIcon.svg';
import PrimaryInputModel from './PrimaryInputModel';
import './Artefacts/PrimaryInput.css';
import Container from '../DependencyInjection/Container';
import GlobalContainer from '../../DependencyInjection/Container';
import Component from '@enbock/ts-jsx/Component';

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

export default class PrimaryInput extends Component<Properties> {
    private adapter: Adapter;
    private state: any; // TODO

    constructor(props: Readonly<Properties>) {
        super(props);
        this.adapter = GlobalContainer.inputAdapter;
        this.state = {model: new PrimaryInputModel()};
    }

    public set model(value: PrimaryInputModel) {
        this.updateProps({model: value}); // TODO
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

    private onInputChange(event: InputEvent): void {
        this.adapter.onInputChange(((event.target || {}) as HTMLInputElement).value);
    }
}
