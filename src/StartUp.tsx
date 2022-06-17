import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateLoader from './ServiceWorkerUpdateLoader';
import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import ShoppingList from './ShoppingList/View/ShoppingList';
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

        const jsx: JSX.Element = <application>
            <style>{Styles}</style>
            <ShoppingList/>
        </application>;
        const rootNode: HTMLElement = ShadowRenderer.render(jsx);
        this.document.body.appendChild(rootNode);
    }
}
