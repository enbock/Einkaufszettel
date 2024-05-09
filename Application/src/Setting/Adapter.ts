export default class Adapter {
    public onDownload: Callback = () => <never>false;
    public onUpload: Callback<(file: File) => Promise<void>> = () => <never>false;
}
