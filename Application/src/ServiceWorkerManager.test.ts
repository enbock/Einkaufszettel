import {ServiceWorkerGlobalScope, ServiceWorkerManager} from './ServiceWorkerManager';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;

describe('ServiceWorkerManager', () => {
    let caches: Mocked<CacheStorage>,
        worker: Mocked<ServiceWorkerGlobalScope>,
        cache: Mocked<Cache>,
        fetch: Spy
    ;

    beforeEach(() => {
        caches = mock<CacheStorage>();
        cache = mock<Cache>();
        worker = mock<ServiceWorkerGlobalScope>();
        (<any>worker).addEventListener = createSpy();
        global.fetch = fetch = createSpy();
    });

    it('Creates', () => {
        const container: any = {};
        const addEventListenerSpy: Spy = worker.addEventListener as Spy;
        addEventListenerSpy.and.callFake((type: string, callback: Callback) => container[type] = callback);

        new ServiceWorkerManager(worker, caches, 'version', ['file list']);

        expect(container.install).toBeInstanceOf(Function);
        expect(container.activate).toBeInstanceOf(Function);
        expect(container.fetch).toBeInstanceOf(Function);
    });

    it('Cache files', (done) => {
        const container: any = {install: new Function()};
        const addEventListenerSpy: Spy = worker.addEventListener as Spy;
        const openSpy: Spy = caches.open as Spy;
        addEventListenerSpy.and.callFake((type: string, callback: Callback) => container[type] = callback);
        const event: any = {waitUntil: createSpy()};

        new ServiceWorkerManager(worker, caches, 'version', ['file list']);

        openSpy.and.resolveTo(cache);
        (cache.addAll as Spy).and.resolveTo(null);
        event.waitUntil = (promise: Promise<void>) => {
            promise.then(() => {
                expect(worker.skipWaiting).toHaveBeenCalled();
                expect(openSpy).toHaveBeenCalledWith('version');
                expect(cache.addAll as Spy).toHaveBeenCalledWith(['file list']);
                done();
            });
        };

        container.install(event);
    });

    it('Clear old files', (done) => {
        const container: any = {activate: new Function()};
        const addEventListenerSpy: Spy = worker.addEventListener as Spy;
        const keySpy: Spy = caches.keys as Spy;
        addEventListenerSpy.and.callFake((type: string, callback: Callback) => container[type] = callback);
        const event: any = {waitUntil: createSpy()};

        new ServiceWorkerManager(worker, caches, 'version', ['file list']);

        keySpy.and.resolveTo(['version', 'old']);
        (cache.addAll as Spy).and.resolveTo(null);
        event.waitUntil = (promise: Promise<void>) => {
            promise.then(() => {
                expect(caches.delete as Spy).toHaveBeenCalledWith('old');
                done();
            });
        };

        container.activate(event);
    });

    it('Fetch cached request', (done) => {
        const container: any = {fetch: new Function()};
        const addEventListenerSpy: Spy = worker.addEventListener as Spy;
        const matchSpy: Spy = caches.match as Spy;
        addEventListenerSpy.and.callFake((type: string, callback: Callback) => container[type] = callback);
        const event: any = {
            request: 'request',
            respondWith: createSpy()
        };

        new ServiceWorkerManager(worker, caches, 'version', ['file list']);

        matchSpy.and.resolveTo('response');
        event.respondWith = (promise: Promise<void>) => {
            promise.then((response) => {
                expect(response).toBe(<MockedObject>'response');

                done();
            });
        };

        container.fetch(event);
    });

    it('Fetch not cached failing request (no response)', (done) => {
        const container: any = {fetch: new Function()};
        const addEventListenerSpy: Spy = worker.addEventListener as Spy;
        const openSpy: Spy = caches.open as Spy;
        const matchSpy: Spy = caches.match as Spy;
        addEventListenerSpy.and.callFake((type: string, callback: Callback) => container[type] = callback);
        const event: any = {
            request: 'request',
            respondWith: createSpy()
        };
        fetch.and.resolveTo(undefined);

        new ServiceWorkerManager(worker, caches, 'version', ['file list']);

        matchSpy.and.resolveTo(undefined);
        openSpy.and.resolveTo(cache);
        (cache.addAll as Spy).and.resolveTo(null);
        event.respondWith = (promise: Promise<void>) => {
            promise.then((response) => {
                expect(response).toBeUndefined();

                done();
            });
        };

        container.fetch(event);
    });

    it('Fetch not cached failing request (not 200)', (done) => {
        const container: any = {fetch: new Function()};
        const addEventListenerSpy: Spy = worker.addEventListener as Spy;
        const openSpy: Spy = caches.open as Spy;
        const matchSpy: Spy = caches.match as Spy;
        addEventListenerSpy.and.callFake((type: string, callback: Callback) => container[type] = callback);
        const event: any = {
            request: 'request',
            respondWith: createSpy()
        };
        const response: any = {
            status: 404,
            type: 'not found',
            clone: createSpy()
        };
        fetch.and.resolveTo(response);

        new ServiceWorkerManager(worker, caches, 'version', ['file list']);

        matchSpy.and.resolveTo(undefined);
        openSpy.and.resolveTo(cache);
        (cache.addAll as Spy).and.resolveTo(null);
        event.respondWith = (promise: Promise<void>) => {
            promise.then((response: any) => {
                expect(response).toBe(response);
                expect(response.clone).not.toHaveBeenCalled();

                done();
            });
        };

        container.fetch(event);
    });

    it('Fetch not cached failing request (not basic response)', (done) => {
        const container: any = {fetch: new Function()};
        const addEventListenerSpy: Spy = worker.addEventListener as Spy;
        const openSpy: Spy = caches.open as Spy;
        const matchSpy: Spy = caches.match as Spy;
        addEventListenerSpy.and.callFake((type: string, callback: Callback) => container[type] = callback);
        const event: any = {
            request: 'request',
            respondWith: createSpy()
        };
        const response: any = {
            status: 200,
            type: 'cached',
            clone: createSpy()
        };
        fetch.and.resolveTo(response);

        new ServiceWorkerManager(worker, caches, 'version', ['file list']);

        matchSpy.and.resolveTo(undefined);
        openSpy.and.resolveTo(cache);
        (cache.addAll as Spy).and.resolveTo(null);
        event.respondWith = (promise: Promise<void>) => {
            promise.then((response: any) => {
                expect(response).toBe(response);
                expect(response.clone).not.toHaveBeenCalled();

                done();
            });
        };

        container.fetch(event);
    });

    it('Fetch request to cache', (done) => {
        const container: any = {fetch: new Function()};
        const addEventListenerSpy: Spy = worker.addEventListener as Spy;
        const openSpy: Spy = caches.open as Spy;
        const matchSpy: Spy = caches.match as Spy;
        const putSpy: Spy = cache.put as Spy;
        addEventListenerSpy.and.callFake((type: string, callback: Callback) => container[type] = callback);
        const event: any = {
            request: 'request',
            respondWith: createSpy()
        };
        const response: any = {
            status: 200,
            type: 'basic',
            clone: createSpy()
        };
        const clonedResponse: any = {type: 'clone'};
        fetch.and.resolveTo(response);

        new ServiceWorkerManager(worker, caches, 'version', ['file list']);

        matchSpy.and.resolveTo(undefined);
        response.clone.and.returnValue(clonedResponse);
        openSpy.and.resolveTo(cache);
        putSpy.and.resolveTo(null);
        event.respondWith = (promise: Promise<void>) => {
            promise.then((result) => {
                expect(result).toBe(response);
                expect(matchSpy).toHaveBeenCalledWith('request');
                expect(openSpy).toHaveBeenCalledWith('version');
                expect(putSpy).toHaveBeenCalledWith('request', clonedResponse);

                done();
            });
        };

        container.fetch(event);
    });
});

