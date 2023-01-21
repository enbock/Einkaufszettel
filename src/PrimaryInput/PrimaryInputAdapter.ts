import ViewAdapter from '../ViewAdapter';

export default class PrimaryInputAdapter implements ViewAdapter {
    public onDelete: Callback = Function;

    public onInputChange: Callback<(newValue: string) => void> = Function;

    public onSubmit: Callback = Function;

    public refresh: Callback = Function;

    public onDiscard: Callback = Function;
}
