import ReactDOM from 'react-dom';
import React, {StrictMode} from 'react';
import Entry, {Adapter} from './EntireList/Entry';
import EntryModel from './EntireList/EntryModel';

export default class StartUp {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  public start(): void {
    // TODO remove it
    let adapter: Adapter = {
      onEntryButtonClick(id: string): void {
      }
    };
    let entryModel: EntryModel = new EntryModel();

    ReactDOM.render(
      <StrictMode><Entry adapter={adapter} model={entryModel}/></StrictMode>,
      this.document.getElementById('root')
    );
  }
}
