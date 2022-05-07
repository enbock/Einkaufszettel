import TabModel from './TabModel';
import Component from '@enbock/ts-jsx/Component';
import NavigationAdapter from './NavigationAdapter';
import Style from './Tab.css';

interface Properties {
    model: TabModel,
    adapter: NavigationAdapter
}

export default class Tab extends Component<Properties> {
    public render(): JSX.Element {
        return <>
            <style>{Style}</style>
            <button
                class={this.props.model.isActive ? 'active' : undefined}
                onClick={() => this.props.adapter.onNavigationClick(this.props.model.name)}
            >
                {this.props.model.label}
            </button>
        </>;
    }
}
