import Pages from '../Pages';

export default class Bus {
    handlePageSwitch: Callback<(page: Pages) => void> = Function;
}
