import ShadowViewConnector from './ShadowViewConnector';
import {mock, MockProxy} from 'jest-mock-extended';
import ViewAttachedController from './ViewAttachedController';

describe(ShadowViewConnector, function () {
    let connector: ShadowViewConnector,
        controller: ViewAttachedController & MockProxy<ViewAttachedController>
    ;

    beforeEach(function () {
        controller = mock<ViewAttachedController>();

        connector = new ShadowViewConnector(controller);
    });

    it('should runtime inject the view into the controller', async function () {
        connector.setComponent('test::component:' as any);

        expect(controller.attach).toBeCalledWith('test::component:');
    });
});
