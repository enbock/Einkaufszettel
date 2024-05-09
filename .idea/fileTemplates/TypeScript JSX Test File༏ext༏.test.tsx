import ${NAME} from './${NAME}';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import ${NAME}Model from './${NAME}Model';
import Adapter from '../Adapter';

describe('${NAME}', function (): void {
    let model: ${NAME}Model,
        adapter: Mocked<Adapter>
    ;
    beforeEach(function (): void {
        model = new ${NAME}Model();
        adapter = mock<Adapter>();
    });

    function createUi(): ${NAME} {
        ViewInjection(${NAME}, adapter);
        const view: ${NAME} = TestRenderer.render(<${NAME}/>) as ${NAME};
        view.model = model;

        return view;
    }

    it('should ???', async function (): Promise<void> {
        const result: HTMLElement = createUi();

        expect(result.innerHTML).toContain('test::???:');
    });
});
