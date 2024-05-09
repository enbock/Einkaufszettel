import BaseComponent, {ComponentProperties} from '@enbock/ts-jsx/Component';
import ViewModel from './ViewModel';

abstract class RootComponent<Properties extends ComponentProperties = ComponentProperties> extends BaseComponent<Properties> {
    abstract model: ViewModel;
}

export default RootComponent;
