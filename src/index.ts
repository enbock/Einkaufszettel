import StartUp from './StartUp';
import './index.css';
import ServiceWorkerUpdateReloader from './ServiceWorkerUpdateReloader';

new StartUp(document, new ServiceWorkerUpdateReloader(window.location)).start();
