import EntryModel from './EntryModel';
import Entry, {Adapter as EntryAdapter} from './Entry';
import BuyingListModel from './BuyingListModel';
import Container from '../DependencyInjection/Container';
import './Artefacts/BuyingList.css';
import Component from '@enbock/ts-jsx/Component';

export interface Adapter extends EntryAdapter {
}

interface Properties {
}

interface State {
    model: BuyingListModel;
}

export default class BuyingList extends Component<Properties> {
    private readonly adapter: Adapter;
    private state: any = {}; // TODO Remove

    constructor(props: Properties) {
        super(props);

        this.state = {
            model: new BuyingListModel()
        };
        this.adapter = Container.adapter;
    }

    public set model(value: BuyingListModel) {
        this.updateProps({model: value}); // TODO correct
    }

    public componentDidMount(): void {
        Container.controller.attach(this);
    }

    public render(): JSX.Element {
        const list: EntryModel[] = this.state.model.list;

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
        return <Entry key={'list-entry-' + entryModel.id} adapter={this.adapter} model={entryModel}/>;
    }
}
