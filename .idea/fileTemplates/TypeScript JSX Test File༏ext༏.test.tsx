import ${NAME} from './${NAME}';
import ${NAME}Model from '../${NAME}Model';
import ${NAME}Adapter from '../${NAME}Adapter';
import {mock, MockProxy} from 'jest-mock-extended';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import {mock as mockComponent} from '@enbock/ts-jsx/Component';

mockComponent(Example);

describe(${NAME}, function () {
    let model: ${NAME}Model,
        adapter: ${NAME}Adapter & MockProxy<${NAME}Adapter>
    ;
    beforeEach(function () {
        model = new ${NAME}Model();
        adapter = mock<${NAME}Adapter>();
    });

    function createUi(): HTMLElement {
        ViewInjection(${NAME}, adapter);
        const view: ${NAME} = TestRenderer.render(<${NAME}/>) as ${NAME};
        view.model = model;

        return view;
    }

    it('should ???', function () {
        const result: HTMLElement = createUi();

        expect(result).toContainHTML('test::???:');
    });
});
