import EntryModel from './EntryModel';
import Entry from './Entry';
import BuyingListModel from './BuyingListModel';
import './Artefacts/BuyingList.css';
import Component, {ComponentProperties} from '@enbock/ts-jsx/Component';
import BuyingListAdapter from './BuyingListAdapter';

interface Properties extends ComponentProperties {
}

export default class BuyingList extends Component<Properties> {
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
        const list: EntryModel[] = this.modelInstance.list;

        return (
            <entire-list>
                <entity-list>
                    {list.map(this.renderEntry.bind(this))}
                </entity-list>
                <visual-background/>
            </entire-list>
        );
    }

    private renderEntry(entryModel: EntryModel): JSX.Element {
        return <Entry adapter={this.adapter} model={entryModel}/>;
    }
}
