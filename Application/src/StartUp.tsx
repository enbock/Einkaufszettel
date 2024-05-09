import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import Styles from './StartUp.css';
import ShoppingList from 'Application/ShoppingList/View/ShoppingList';
import ModuleController from 'Application/ModuleController';

export default class StartUp {

    constructor(
        private document: Document,
        private controllers: Array<ModuleController>
    ) {
    }

    public async start(): Promise<void> {
        for (const controller of this.controllers)
            await controller.init();

        const jsx: JSX.Element = <application>
            <style>{Styles}</style>
            <ShoppingList/>
        </application>;
        const rootNode: HTMLElement = ShadowRenderer.render(jsx);
        this.document.body.appendChild(rootNode);
    }
}
