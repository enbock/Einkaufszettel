import ReactDOM from 'react-dom';
import React, {StrictMode} from 'react';
import EntireList from './EntireList/EntireList';
import PrimaryInput from './PrimaryInput/PrimaryInput';

export default class StartUp {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  public start(): void {
    ReactDOM.render(
      <StrictMode>
        <PrimaryInput/>
        <EntireList/>
      </StrictMode>,
      this.document.getElementById('root')
    );
  }
}
