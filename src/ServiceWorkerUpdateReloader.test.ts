import ServiceWorkerUpdateReloader from './ServiceWorkerUpdateReloader';
import {mock, MockProxy} from 'jest-mock-extended';

describe(ServiceWorkerUpdateReloader, function () {
  let reloader: ServiceWorkerUpdateReloader,
    location: MockProxy<Location>,
    registration: MockProxy<ServiceWorkerRegistration>,
    serviceWorker: MockProxy<ServiceWorker>
  ;

  beforeEach(function () {
    location = mock<Location>();
    registration = mock<ServiceWorkerRegistration>();
    serviceWorker = mock<ServiceWorker>();
    reloader = new ServiceWorkerUpdateReloader(location);
  });

  it('should reload the application when new change in service worker are available', function () {
    (registration as any).waiting = serviceWorker;

    reloader.onUpdate(registration);

    expect(location.reload).toBeCalled();
    expect(serviceWorker.postMessage).toBeCalledWith({type: 'SKIP_WAITING'});
  });

  it('should reload the application also if no worker waiting', function () {
    (registration as any).waiting = undefined;

    reloader.onUpdate(registration);
    expect(location.reload).toBeCalledTimes(1);
    expect(serviceWorker.postMessage).not.toBeCalledWith({type: 'SKIP_WAITING'});

    reloader.onUpdate();
    expect(location.reload).toBeCalledTimes(2);
  });
});
