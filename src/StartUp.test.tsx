import React, {Component, StrictMode} from 'react';
import ReactDOM from 'react-dom';
import StartUp from './StartUp';
import EntireList from './EntireList/EntireList';
import PrimaryInput from './PrimaryInput/PrimaryInput';

jest.mock('react-dom', function () {
  return {
    render: jest.fn()
  };
});

jest.mock('./EntireList/EntireList');
jest.mock('./PrimaryInput/PrimaryInput');

describe(StartUp, function () {
  it('should start the application', function () {
    (EntireList as jest.Mock).mockImplementation(function () {
      return class EntireList extends Component<any, any> {
      };
    });
    (PrimaryInput as jest.Mock).mockImplementation(function () {
      return class PrimaryInput extends Component<any, any> {
      };
    });

    const getElementByIdMock: jest.Mock = jest.fn();
    getElementByIdMock.mockReturnValueOnce('test::HTMLElement:');
    const document: Document = {getElementById: getElementByIdMock as any} as Document;

    new StartUp(document).start();

    expect(ReactDOM.render).toBeCalledWith(<StrictMode><PrimaryInput/><EntireList/></StrictMode>, 'test::HTMLElement:');
    expect(getElementByIdMock).toBeCalledWith('root');
  });
});
