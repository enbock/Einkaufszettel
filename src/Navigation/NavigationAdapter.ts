import ViewAdapter from '../ViewAdapter';

export default class NavigationAdapter implements ViewAdapter {
    public onNavigationClick: Callback<(activeList: string) => void> = Function;
    public onUndoClick: Callback = Function;
    public refresh: Callback = Function;
    public onSettingClick: Callback = Function;
}
