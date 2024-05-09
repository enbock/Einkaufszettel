import Pages from 'Core/ShoppingList/Pages';

export default interface ApplicationStorage {
    setActivePage(page: Pages): void;

    getActivePage(): Pages;
}
