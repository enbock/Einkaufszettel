import ShadowViewConnector from './ShadowViewConnector';
import {mock, MockProxy} from 'jest-mock-extended';
import Controller from './Controller';

describe(ShadowViewConnector, function () {
    let connector: ShadowViewConnector,
        controller: Controller & MockProxy<Controller>
    ;

    beforeEach(function () {
        controller = mock<Controller>();

        connector = new ShadowViewConnector(controller);
    });

    it('should runtime inject the view into the controller', async function () {
        connector.setComponent('test::component:' as any)

        expect(controller.attach).toBeCalledWith('test::component:');
    });
});
