export default class PrimaryInputAdapter {
    public onDelete: Callback = () => <never>false;
    public onInputChange: Callback<(newValue: string) => Promise<void>> = () => <never>false;
    public onSubmit: Callback = () => <never>false;
    public refresh: Callback = () => <never>false;
    public onDiscard: Callback = () => <never>false;
}
