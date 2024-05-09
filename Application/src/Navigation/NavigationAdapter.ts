export default class NavigationAdapter {
    public onNavigationClick: Callback<(activeList: string) => Promise<void>> = () => <never>false;
    public onUndoClick: Callback = () => <never>false;
    public refresh: Callback = () => <never>false;
    public onSettingClick: Callback = () => <never>false;
}
