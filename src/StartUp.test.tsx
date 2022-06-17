import StartUp from './StartUp';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateLoader from './ServiceWorkerUpdateLoader';
import {mock, MockProxy} from 'jest-mock-extended';
import {mock as mockComponent} from '@enbock/ts-jsx/Component';
import ShoppingList from './ShoppingList/View/ShoppingList';

mockComponent(ShoppingList);

describe(StartUp, function () {
    let startup: StartUp,
        updateLoader: ServiceWorkerUpdateLoader & MockProxy<ServiceWorkerUpdateLoader>,
        serviceWorker: typeof serviceWorkerRegistration & MockProxy<typeof serviceWorkerRegistration>
    ;

    beforeEach(function () {
        updateLoader = mock<ServiceWorkerUpdateLoader>();
        serviceWorker = mock<typeof serviceWorkerRegistration>();

        startup = new StartUp(
            document,
            updateLoader,
            serviceWorker
        );
    });

    it('should start the application', function () {

        startup.start();

        expect(serviceWorker.register).toBeCalledWith(updateLoader);
        expect(document.body).toHaveTextContent('test::ShoppingList:');
    });
});
