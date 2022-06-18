import BuyingListModel, {EntryModel} from './BuyingListModel';
import Styles from './Assets/BuyingList.css';
import Component from '@enbock/ts-jsx/Component';
import BuyingListAdapter from '../BuyingListAdapter';
import RootView from '../../RootView';

interface Properties {
}

export default class BuyingList extends Component<Properties> implements RootView {
    private modelInstance: BuyingListModel = new BuyingListModel();

    constructor(
        props: Properties,
        private adapter: BuyingListAdapter
    ) {
        super(props);
    }

    public set model(value: BuyingListModel) {
        this.modelInstance = value;
        this.renderShadow();
    }

    public render(): JSX.Element {
        return <>
            <style>{Styles}</style>
            {this.modelInstance.list.map(this.renderEntry.bind(this))}
        </>;
    }

    private renderEntry(model: EntryModel): JSX.Element {
        const adapter: BuyingListAdapter = this.adapter;
        return <>
            <list-label onClick={() => adapter.onSelectClick(model.id)}>
                <text>{model.label}</text>
            </list-label>
            <button onClick={() => adapter.onEntryButtonClick(model.id)}/>
        </>;
    }
}
