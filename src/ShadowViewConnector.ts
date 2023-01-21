import Component, {ShadowComponentReceiver} from '@enbock/ts-jsx/Component';
import ViewAttachedController from './ViewAttachedController';

export default class ShadowViewConnector implements ShadowComponentReceiver {
    constructor(
        private controller: ViewAttachedController
    ) {
    }

    public setComponent(view: Component): void {
        this.controller.attach(view as any);
    }
}
