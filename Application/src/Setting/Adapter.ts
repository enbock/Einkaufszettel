export default class Adapter {
    public onDownload: Callback = () => <never>false;
    public onUpload: Callback = () => <never>false;
}
