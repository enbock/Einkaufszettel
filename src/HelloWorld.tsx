import React, {Component, StrictMode} from 'react';

export default class HelloWorld extends Component<any, any> {
  public render(): JSX.Element {
    return (
      <StrictMode>
        <div>Hello World!</div>
      </StrictMode>
    );
  }
}
