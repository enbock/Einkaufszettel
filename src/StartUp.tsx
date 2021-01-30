import ReactDOM from 'react-dom';
import React, {StrictMode} from 'react';
import HelloWorld from './HelloWorld';

export default class StartUp {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  public start(): void {
    ReactDOM.render(<StrictMode><HelloWorld/></StrictMode>, this.document.getElementById('root'));
  }
}
