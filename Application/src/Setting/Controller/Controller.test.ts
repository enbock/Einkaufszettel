import Controller from './Controller';
import SettingModel from 'Application/Setting/View/SettingModel';
import SettingPresenter from 'Application/Setting/View/SettingPresenter';
import Setting from 'Application/Setting/View/Setting';
import ControllerHandler from 'Application/ControllerHandler';

describe('Controller', function () {
    let controller: Controller,
        settingPresenter: Mocked<SettingPresenter>,
        settingTemplate: Mocked<typeof Setting>,
        setting: Mocked<Setting>,
        handler: Mocked<ControllerHandler>,
        handlers: Array<Mocked<ControllerHandler>>
    ;

    beforeEach(function () {
        settingPresenter = mock<SettingPresenter>();
        settingTemplate = mock<typeof Setting>();
        setting = mock<Setting>();
        handler = mock<ControllerHandler>();
        handlers = [handler];

        controller = new Controller(
            settingPresenter,
            handlers,
            settingTemplate
        );

        settingTemplate.componentReceiver?.setComponent(setting);
    });

    it('should initialize controller and present data to the setting component', async function (): Promise<void> {
        const settingModel: SettingModel = <MockedObject>'test::settingModel';
        settingPresenter.present.and.returnValue(settingModel);

        await controller.init();

        expect(settingPresenter.present).toHaveBeenCalled();
        expect(setting.model).toBe(settingModel);
    });
});
