import StartUp from './StartUp';
import ShoppingList from 'Application/ShoppingList/View/ShoppingList';
import ModuleController from 'Application/ModuleController';

describe('StartUp', function (): void {
    let startup: StartUp,
        moduleController: Mocked<ModuleController>,
        controllers: Array<Mocked<ModuleController>>
    ;

    beforeEach(function (): void {
        mockModule(
            'Application/ShoppingList/View/ShoppingList',
            function factory(module: any): Object {
                const Component: typeof ShoppingList = module.default;
                return {
                    default: class MockedShoppingList extends Component {
                        public render(): JSX.Element {
                            this.innerHTML =
                                'test::ShoppingList:[' +
                                String(this.props.model) +
                                ',' +
                                String(this.props.adapter) +
                                ']';
                            return '';
                        }
                    }
                };
            }
        );

        moduleController = mock<ModuleController>();
        controllers = [moduleController];

        startup = new StartUp(
            document,
            controllers
        );
    });

    afterEach(function (): void {
        restoreModules();
    });

    it('should start the application', async function (): Promise<void> {
        await startup.start();

        expect(moduleController.init).toHaveBeenCalled();
        expect(document.body.textContent).toContain('test::ShoppingList:');
    });
});

