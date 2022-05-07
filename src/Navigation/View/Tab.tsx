import TabModel from './TabModel';
import Component from '@enbock/ts-jsx/Component';
import NavigationAdapter from './NavigationAdapter';

interface Properties {
    model: TabModel,
    adapter: NavigationAdapter
}

export default class Tab extends Component<Properties> {
    public render() {
        return (
            <button
                class={this.props.model.isActive ? 'active' : undefined}
                onClick={() => this.props.adapter.onNavigationClick(this.props.model.name)}
            >
                {this.props.model.label}
            </button>
        );
    }
}
