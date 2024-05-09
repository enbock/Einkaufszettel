import Component, {ShadowComponentReceiver} from '@enbock/ts-jsx/Component';
import RootView from './RootView';

export default interface ModuleController extends ShadowComponentReceiver {
    init(): Promise<void>;

    setComponent(view: Component & RootView): void;
}
