import SubmitIcon from './Artefacts/SubmitIcon.svg';
import EntryModel from './EntryModel';
import Component from '@enbock/ts-jsx/Component';
import BuyingListAdapter from './BuyingListAdapter';

interface Properties {
    adapter: BuyingListAdapter,
    model: EntryModel
}

export default class Entry extends Component<Properties> {
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
