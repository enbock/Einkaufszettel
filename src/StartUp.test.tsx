import StartUp from './StartUp';
import BuyingList from './BuyingList/View/BuyingList';
import PrimaryInput from './PrimaryInput/View/PrimaryInput';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateLoader from './ServiceWorkerUpdateLoader';
import {mock, MockProxy} from 'jest-mock-extended';
import Navigation from './Navigation/View/Navigation';
import mockComponent from './mockComponent';

mockComponent(BuyingList);
mockComponent(PrimaryInput);
mockComponent(Navigation);

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
        expect(document.body).toHaveTextContent('test::PrimaryInput:');
        expect(document.body).toHaveTextContent('test::BuyingList:');
        expect(document.body).toHaveTextContent('test::Navigation:');
    });
});
