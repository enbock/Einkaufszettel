import Pages from 'Core/ShoppingList/Pages';

export default class Bus {
    handlePageSwitch: Callback<(page: Pages) => Promise<void>> = () => <never>false;
}
