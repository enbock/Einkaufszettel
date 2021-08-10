import React, {Component, StrictMode} from 'react';
import ReactDOM from 'react-dom';
import StartUp from './StartUp';
import BuyingList from './BuyingList/React/BuyingList';
import PrimaryInput from './PrimaryInput/React/PrimaryInput';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ServiceWorkerUpdateReloader from './ServiceWorkerUpdateReloader';
import {mock} from 'jest-mock-extended';
import Navigation from './Navigation/React/Navigation';

jest.mock('react-dom', function () {
  return {
    render: jest.fn()
  };
});

jest.mock('./BuyingList/React/BuyingList');
jest.mock('./PrimaryInput/React/PrimaryInput');
jest.mock('./Navigation/React/Navigation');
jest.mock('./serviceWorkerRegistration', function () {
  return {register: jest.fn()};
});

describe(StartUp, function () {
  let reloader: ServiceWorkerUpdateReloader;

  beforeEach(function () {
    reloader = mock<ServiceWorkerUpdateReloader>();
  });

  it('should start the application', function () {
    (BuyingList as jest.Mock).mockImplementation(function () {
      return class BuyingList extends Component<any, any> {
      };
    });
    (PrimaryInput as jest.Mock).mockImplementation(function () {
      return class PrimaryInput extends Component<any, any> {
      };
    });
    (Navigation as jest.Mock).mockImplementation(function () {
      return class Navigation extends Component<any, any> {
      };
    });

    const getElementByIdMock: jest.Mock = jest.fn();
    getElementByIdMock.mockReturnValueOnce('test::HTMLElement:');
    const document: Document = {getElementById: getElementByIdMock as any} as Document;

    new StartUp(document, reloader).start();

    const expectedJsx:JSX.Element = <StrictMode><Navigation/><PrimaryInput/><BuyingList/></StrictMode>;
    expect(ReactDOM.render).toBeCalledWith(expectedJsx, 'test::HTMLElement:');
    expect(getElementByIdMock).toBeCalledWith('root');
    expect(serviceWorkerRegistration.register).toBeCalledWith(reloader);
  });
});
