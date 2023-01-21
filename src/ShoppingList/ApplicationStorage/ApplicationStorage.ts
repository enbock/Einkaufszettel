import Pages from '../Pages';

export default interface ApplicationStorage {
    setActivePage(page: Pages): void;

    getActivePage(): Pages;
}
