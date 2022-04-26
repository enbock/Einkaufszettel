import TabModel from './TabModel';
import Component from '@enbock/ts-jsx/Component';

export interface Adapter {
    onNavigationClick(activeList: string): void;
}

interface Properties {
    model: TabModel,
    adapter: Adapter
}

export default class Tab extends Component<Properties> {
    public render() {
        return (
            <button
                className={this.props.model.isActive ? 'active' : undefined}
                onClick={() => this.props.adapter.onNavigationClick(this.props.model.name)}
            >
                {this.props.model.label}
            </button>
        );
    }
}
