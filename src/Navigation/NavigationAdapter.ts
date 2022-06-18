import ViewAdapter from '../ViewAdapter';

export default class NavigationAdapter implements ViewAdapter {
    public onNavigationClick: Callback<(activeList: string) => void>;
    public onUndoClick: Callback<() => void>;
    public onUndoChange: Callback<() => void>;
}
