import Component from '@enbock/ts-jsx/Component';

export default function mockComponent<T>(module: T): void {
    const staticReference: typeof Component = module as unknown as typeof Component;

    function mockedFactory(): Component {
        let node: Component = document.createElement('div') as any;
        const output: string = 'test::' + staticReference.name + ':';
        const textNode: Text = document.createTextNode(output);
        node.appendChild(textNode);
        node.updateProps = function (props: any) {
            const shownProps: any = {...props};
            if (shownProps.hasOwnProperty('attach')) shownProps.attach = shownProps.attach.toString();
            if (shownProps.hasOwnProperty('adapter')) shownProps.adapter = shownProps.adapter.toString();
            textNode.nodeValue = output + JSON.stringify(shownProps);
        };
        return node;
    }

    staticReference.factory = mockedFactory;
}
