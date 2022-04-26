import StartUp from './StartUp';
import BuyingList from './BuyingList/View/BuyingList';
import PrimaryInput from './PrimaryInput/View/PrimaryInput';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateLoader from './ServiceWorkerUpdateLoader';
import {mock, MockProxy} from 'jest-mock-extended';
import Navigation from './Navigation/View/Navigation';
import Component from '@enbock/ts-jsx/Component';

mockComponent(BuyingList);
mockComponent(PrimaryInput);
mockComponent(Navigation);

function mockComponent(module: any): void {
    function mockedFactory(): HTMLElement {
        let node: Component = document.createElement('div') as any;
        node.appendChild(document.createTextNode('test::' + module.name + ':'));
        node.updateProps = jest.fn();
        return node;
    }

    module.factory = mockedFactory;
}

describe(StartUp, function () {
    let startup: StartUp,
        updateLoader: ServiceWorkerUpdateLoader & MockProxy<ServiceWorkerUpdateLoader>,
        serviceWorker: typeof serviceWorkerRegistration & MockProxy<typeof serviceWorkerRegistration>
    ;

    beforeEach(function () {
        updateLoader = mock<ServiceWorkerUpdateLoader>();
        serviceWorker = mock<typeof serviceWorkerRegistration>();

        startup = new StartUp(document, updateLoader, serviceWorker);
    });

    it('should start the application', function () {

        startup.start();

        expect(serviceWorker.register).toBeCalledWith(updateLoader);
        expect(document.body).toHaveTextContent('test::PrimaryInput:');
        expect(document.body).toHaveTextContent('test::BuyingList:');
        expect(document.body).toHaveTextContent('test::Navigation:');
    });
});
