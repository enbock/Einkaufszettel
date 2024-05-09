import ModuleController from 'Application/ModuleController';
import Setting from 'Application/Setting/View/Setting';
import ControllerHandler, {PresentDataCallback} from 'Application/ControllerHandler';
import SettingModel from 'Application/Setting/View/SettingModel';
import SettingPresenter from 'Application/Setting/View/SettingPresenter';

export default class Controller implements ModuleController {
    private isInitialized: boolean = false;
    private setting?: Setting;

    constructor(
        private settingPresenter: SettingPresenter,
        private handlers: Array<ControllerHandler>,
        settingTemplate: typeof Setting
    ) {
        settingTemplate.componentReceiver = this;
    }

    setComponent(view: Setting): void {
        this.setting = view;
        void this.presentData();
    }

    public async init(): Promise<void> {
        const boundDataPresenting: PresentDataCallback = this.presentData.bind(this);

        await Promise.all(
            this.handlers.map(h => h.initialize(boundDataPresenting))
        );

        this.isInitialized = true;
        void this.presentData();
    }

    private async presentData(): Promise<void> {
        if (this.isInitialized == false) return;

        const settingModel: SettingModel = this.settingPresenter.present();

        if (this.setting) this.setting.model = settingModel;
    }
}
