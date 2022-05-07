import ViewAdapter from '../ViewAdapter';

export default class PrimaryInputAdapter implements ViewAdapter {
    public onDiscard: Callback<() => void>;

    public onInputChange: Callback<(newValue: string) => void>;

    public onSubmit: Callback<() => void>;

    public onListChange: Callback<() => void>;
}
