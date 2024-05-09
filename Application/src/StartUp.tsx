import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import Styles from './StartUp.css';
import ShoppingList from 'Application/ShoppingList/View/ShoppingList';

export default class StartUp {

    constructor(
        private document: Document
    ) {
    }

    public start(): void {
        const jsx: JSX.Element = <application>
            <style>{Styles}</style>
            <ShoppingList/>
        </application>;
        const rootNode: HTMLElement = ShadowRenderer.render(jsx);
        this.document.body.appendChild(rootNode);
    }
}
