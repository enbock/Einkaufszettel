import PrimaryInputModel from './PrimaryInputModel';
import Styles from './Assets/PrimaryInput.css';
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
                    name="editLine"
                    value={this.modelInstance.inputValue}
                    onChange={this.onInputChange.bind(this)}
                    onInput={this.onInputChange.bind(this)}
                />
                {this.renderDiscardButton()}
                {this.renderSubmitButton()}
                {this.renderDeleteButton()}
            </input-frame>
            <style>{Styles}</style>
        </>;
    }

    private renderSubmitButton(): JSX.Element {
        const model: PrimaryInputModel = this.modelInstance;
        if (this.modelInstance.showSubmitButton === false) return <div/>;

        return (
            <button name="submit" onClick={() => this.adapter.onSubmit()} aria-label={model.i18n.submit}/>
        );
    }

    private renderDeleteButton(): JSX.Element {
        const model: PrimaryInputModel = this.modelInstance;
        if (model.showDeleteButton === false) return '';
        return (
            <button name="delete" onClick={() => this.adapter.onDelete()} aria-label={model.i18n.delete}/>
        );
    }

    private renderDiscardButton(): JSX.Element {
        const model: PrimaryInputModel = this.modelInstance;
        if (model.showDiscardButton === false) return <div/>;
        return (
            <button name="discard" onClick={() => this.adapter.onDiscard()} aria-label={model.i18n.discard}/>
        );
    }

    private onInputChange(event: InputEvent): void {
        this.adapter.onInputChange(((event.target || {}) as HTMLInputElement).value || '');
    }
}
