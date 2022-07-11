import ViewAdapter from '../ViewAdapter';

export default class PrimaryInputAdapter implements ViewAdapter {
    public onDelete: Callback<() => void>;

    public onInputChange: Callback<(newValue: string) => void>;

    public onSubmit: Callback<() => void>;

    public refresh: Callback<() => void>;

    public onDiscard: Callback<() => void>;
}
