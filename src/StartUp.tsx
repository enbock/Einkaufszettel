import ReactDOM from 'react-dom';
import React, {StrictMode} from 'react';
import EntireList from './EntireList/EntireList';
import PrimaryInput from './PrimaryInput/PrimaryInput';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateReloader from './ServiceWorkerUpdateReloader';

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
        <PrimaryInput/>
        <EntireList/>
      </StrictMode>,
      this.document.getElementById('root')
    );
  }
}
