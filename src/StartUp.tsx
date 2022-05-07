import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateLoader from './ServiceWorkerUpdateLoader';
import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import PrimaryInput from './PrimaryInput/View/PrimaryInput';
import BuyingList from './BuyingList/View/BuyingList';
import Navigation from './Navigation/View/Navigation';
import Styles from './StartUp.css';

export default class StartUp {

    constructor(
        private document: Document,
        private updateLoader: ServiceWorkerUpdateLoader,
        private serviceWorker: typeof serviceWorkerRegistration
    ) {
    }

    public start(): void {
        this.serviceWorker.register(this.updateLoader);

        const jsx: JSX.Element = <div>
            <style>{Styles}</style>
            <Navigation/>
            <PrimaryInput/>
            <BuyingList/>
        </div>;
        const rootNode: HTMLElement = ShadowRenderer.render(jsx);
        this.document.body.appendChild(rootNode);
    }
}
