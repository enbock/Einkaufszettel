import BuyingList from './BuyingList/View/BuyingList';
import PrimaryInput from './PrimaryInput/View/PrimaryInput';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateLoader from './ServiceWorkerUpdateLoader';
import Navigation from './Navigation/View/Navigation';
import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';

export default class StartUp {

    constructor(
        private document: Document,
        private updateLoader: ServiceWorkerUpdateLoader,
        private serviceWorker: typeof serviceWorkerRegistration
    ) {
    }

    public start(): void {
        this.serviceWorker.register(this.updateLoader);

        const rootNode: HTMLElement = ShadowRenderer.render(
            <div>
                <Navigation/>
                <PrimaryInput/>
                <BuyingList/>
            </div>
        );
        this.document.body.appendChild(rootNode);
    }
}
