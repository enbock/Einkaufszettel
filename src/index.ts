import StartUp from './StartUp';
import './index.css';
import ServiceWorkerUpdateLoader from './ServiceWorkerUpdateLoader';

new StartUp(document, new ServiceWorkerUpdateLoader(window.location)).start();
