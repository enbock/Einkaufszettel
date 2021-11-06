import ReactDOM from 'react-dom';
import React, {StrictMode} from 'react';
import BuyingList from './BuyingList/React/BuyingList';
import PrimaryInput from './PrimaryInput/React/PrimaryInput';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateLoader from './ServiceWorkerUpdateLoader';
import Navigation from './Navigation/React/Navigation';

export default class StartUp {
  private readonly document: Document;
  private readonly reloader: ServiceWorkerUpdateLoader;

  constructor(document: Document, reloader: ServiceWorkerUpdateLoader) {
    this.reloader = reloader;
    this.document = document;
  }

  public start(): void {
    serviceWorkerRegistration.register(this.reloader);

    ReactDOM.render(
      <StrictMode>
        <Navigation/>
        <PrimaryInput/>
        <BuyingList/>
      </StrictMode>,
      this.document.getElementById('root')
    );
  }
}
