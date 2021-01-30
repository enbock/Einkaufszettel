import React, {Component, StrictMode} from 'react';
import ReactDOM from 'react-dom';
import StartUp from './StartUp';
import HelloWorld from './HelloWorld';

jest.mock('react-dom', function () {
  return {
    render: jest.fn()
  };
});

jest.mock('./HelloWorld');

describe(StartUp, function () {
  it('should start the application', function () {
    (HelloWorld as jest.Mock).mockImplementation(function () {
      return class HelloWorld extends Component<any, any> {
      };
    });

    const getElementByIdMock:jest.Mock = jest.fn();
    getElementByIdMock.mockReturnValueOnce('test::HTMLElement:')
    const document: Document = {getElementById: getElementByIdMock as any} as Document;

    new StartUp(document).start();

    expect(ReactDOM.render).toBeCalledWith(<StrictMode><HelloWorld/></StrictMode>, 'test::HTMLElement:');
    expect(getElementByIdMock).toBeCalledWith('root')
  });
});
