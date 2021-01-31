import React, {Component} from 'react';
import StartUp from './StartUp';
import Entry from './EntireList/Entry';

jest.mock('react-dom', function () {
  return {
    render: jest.fn()
  };
});

jest.mock('./EntireList/Entry');

describe(StartUp, function () {
  it('should start the application', function () {
    (Entry as jest.Mock).mockImplementation(function () {
      return class Entry extends Component<any, any> {
      };
    });

    const getElementByIdMock: jest.Mock = jest.fn();
    getElementByIdMock.mockReturnValueOnce('test::HTMLElement:');
    const document: Document = {getElementById: getElementByIdMock as any} as Document;

    new StartUp(document).start();


    //TODO expect(ReactDOM.render).toBeCalledWith(<StrictMode><Entry adapter={adapter} model={entryModel}/></StrictMode>, 'test::HTMLElement:');
    expect(getElementByIdMock).toBeCalledWith('root');
  });
});
