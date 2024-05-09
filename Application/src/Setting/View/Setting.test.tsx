import Setting from './Setting';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import SettingModel from 'Application/Setting/View/SettingModel';
import Adapter from 'Application/Setting/Adapter';
import {fireEvent, getByText} from '@testing-library/dom';

describe('Setting', function (): void {
    let model: SettingModel,
        adapter: Mocked<Adapter>
    ;
    beforeEach(function (): void {
        model = new SettingModel();
        adapter = mock<Adapter>();
    });

    function createUi(): HTMLElement {
        ViewInjection(Setting, adapter);
        const view: Setting = TestRenderer.render(<Setting/>) as Setting;
        view.model = model;

        return view;
    }

    it('should click on download', function () {
        const result: HTMLElement = createUi();

        fireEvent.click(getByText(result, model.i18n.downloadLabel));

        expect(adapter.onDownload).toHaveBeenCalled();
    });

    it('should click on upload', function () {
        const result: HTMLElement = createUi();

        fireEvent.click(getByText(result, model.i18n.uploadLabel));

        expect(adapter.onUpload).toHaveBeenCalled();
    });
});
