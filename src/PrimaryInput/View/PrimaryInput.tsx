import DiscardIcon from './Artefacts/DiscardIcon.svg';
import SubmitIcon from './Artefacts/SubmitIcon.svg';
import PrimaryInputModel from './PrimaryInputModel';
import Styles from './Artefacts/PrimaryInput.css';
import Component from '@enbock/ts-jsx/Component';
import RootView from '../../RootView';
import PrimaryInputAdapter from '../PrimaryInputAdapter';

interface Properties {
}

export default class PrimaryInput extends Component<Properties> implements RootView {
    public modelInstance: PrimaryInputModel = new PrimaryInputModel();

    constructor(
        props: Readonly<Properties>,
        private adapter: PrimaryInputAdapter
    ) {
        super(props);
    }

    public set model(value: PrimaryInputModel) {
        this.modelInstance = value;
        this.renderShadow();
    }

    public render(): JSX.Element {
        return <>
            <input-frame>
                <input
                    autoComplete="off"
                    name="editLine" value={this.modelInstance.inputValue}
                    onChange={this.onInputChange.bind(this)}
                    onInput={this.onInputChange.bind(this)}
                />
                {this.renderSubmitButton()}
                {this.renderDiscardButton()}
            </input-frame>
            <style>{Styles}</style>
        </>;
    }

    private renderSubmitButton(): JSX.Element {
        if (this.modelInstance.showSubmitButton === false) return <button name="placeholder"/>;

        return (
            <button name="submit" onClick={() => this.adapter.onSubmit()}>
                <img src={SubmitIcon} alt="Übernehmen"/>
            </button>
        );
    }

    private renderDiscardButton(): JSX.Element {
        const model: PrimaryInputModel = this.modelInstance;
        if (model.showDiscardButton === false) return '';
        return (
            <button name="discard" onClick={() => this.adapter.onDiscard()}>
                <img src={DiscardIcon} alt={model.discardLabel}/>
            </button>
        );
    }

    private onInputChange(event: InputEvent): void {
        this.adapter.onInputChange(((event.target || {}) as HTMLInputElement).value || '');
    }
}
