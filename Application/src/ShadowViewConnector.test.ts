import ShadowViewConnector from './ShadowViewConnector';
import ViewAttachedController from './ViewAttachedController';

describe('ShadowViewConnector', function (): void {
    let connector: ShadowViewConnector,
        controller: Mocked<ViewAttachedController>
    ;

    beforeEach(function (): void {
        controller = mock<ViewAttachedController>();

        connector = new ShadowViewConnector(controller);
    });

    it('should runtime inject the view into the controller', async function () {
        controller.attach.and.resolveTo();
        connector.setComponent(<MockedObject>'test::component:');

        expect(controller.attach).toHaveBeenCalledWith(<MockedObject>'test::component:');
    });
});
