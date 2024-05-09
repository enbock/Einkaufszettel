import StartUp from './StartUp';
import ShoppingList from 'Application/ShoppingList/View/ShoppingList';

describe('StartUp', function (): void {
    let startup: StartUp;

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

        startup = new StartUp(
            document
        );
    });

    afterEach(function (): void {
        restoreModules();
    });

    it('should start the application', async function (): Promise<void> {
        startup.start();

        expect(document.body.textContent).toContain('test::ShoppingList:');
    });
});

