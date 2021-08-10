import ReactDOM from 'react-dom';
import React, {StrictMode} from 'react';
import BuyingList from './BuyingList/React/BuyingList';
import PrimaryInput from './PrimaryInput/React/PrimaryInput';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateReloader from './ServiceWorkerUpdateReloader';
import Navigation from './Navigation/React/Navigation';

export default class StartUp {
  private readonly document: Document;
  private readonly reloader: ServiceWorkerUpdateReloader;

  constructor(document: Document, reloader:ServiceWorkerUpdateReloader) {
    this.reloader = reloader;
    this.document = document;
  }

  public start(): void {
    serviceWorkerRegistration.register(this.reloader);

    ReactDOM.render(
      <StrictMode>
        <Navigation />
        <PrimaryInput/>
        <BuyingList/>
      </StrictMode>,
      this.document.getElementById('root')
    );
  }
}
