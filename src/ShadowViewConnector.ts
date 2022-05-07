import Component, {ShadowComponentReceiver} from '@enbock/ts-jsx/Component';
import Controller from './Controller';

export default class ShadowViewConnector implements ShadowComponentReceiver {
    constructor(
        private controller: Controller
    ) {
    }

    public setComponent(view: Component): void {
        this.controller.attach(view as any);
    }
}
