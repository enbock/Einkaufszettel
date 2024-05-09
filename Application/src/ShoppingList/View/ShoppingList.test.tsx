import ShoppingList from './ShoppingList';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import ShoppingListModel from './ShoppingListModel';
import Navigation from 'Application/Navigation/View/Navigation';
import PrimaryInput from 'Application/PrimaryInput/View/PrimaryInput';
import BuyingList from 'Application/BuyingList/View/BuyingList';
import Setting from 'Application/Setting/View/Setting';

describe('ShoppingList', function (): void {
    let model: ShoppingListModel;

    beforeEach(function (): void {
        mockModule(
            'Application/Navigation/View/Navigation',
            function factory(module: any): Object {
                const Component: typeof Navigation = module.default;
                return {
                    default: class MockedNavigation extends Component {
                        public render(): JSX.Element {
                            this.innerHTML =
                                'test::Navigation:[' +
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
        mockModule(
            'Application/PrimaryInput/View/PrimaryInput',
            function factory(module: any): Object {
                const Component: typeof PrimaryInput = module.default;
                return {
                    default: class MockedPrimaryInput extends Component {
                        public render(): JSX.Element {
                            this.innerHTML =
                                'test::PrimaryInput:[' +
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
        mockModule(
            'Application/BuyingList/View/BuyingList',
            function factory(module: any): Object {
                const Component: typeof BuyingList = module.default;
                return {
                    default: class MockedBuyingList extends Component {
                        public render(): JSX.Element {
                            this.innerHTML =
                                'test::BuyingList:[' +
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
        mockModule(
            'Application/Setting/View/Setting',
            function factory(module: any): Object {
                const Component: typeof Setting = module.default;
                return {
                    default: class MockedSetting extends Component {
                        public render(): JSX.Element {
                            this.innerHTML =
                                'test::Setting:[' + String(this.props.model) + ',' + String(this.props.adapter) + ']';
                            return '';
                        }
                    }
                };
            }
        );

        model = new ShoppingListModel();
    });

    afterEach(function (): void {
        restoreModules();
    });

    function createUi(): HTMLElement {
        const view: ShoppingList = TestRenderer.render(<ShoppingList/>) as ShoppingList;
        view.model = model;

        return view;
    }

    it('should show main components', async function (): Promise<void> {
        const result: HTMLElement = createUi();

        expect(result.innerHTML).toContain('test::Navigation:');
    });

    it('should show BuyingList when showBuyingList is true', async function (): Promise<void> {
        model.showBuyingList = true;

        const result: HTMLElement = createUi();

        expect(result.innerHTML).toContain('test::PrimaryInput:');
        expect(result.innerHTML).toContain('test::BuyingList:');
        expect(result.innerHTML).not.toContain('test::Setting:');
    });

    it('should show Setting when showSetting is true', async function (): Promise<void> {
        model.showSetting = true;

        const result: HTMLElement = createUi();

        expect(result.innerHTML).toContain('test::Setting:');
        expect(result.innerHTML).not.toContain('test::PrimaryInput:');
        expect(result.innerHTML).not.toContain('test::BuyingList:');
    });
});
