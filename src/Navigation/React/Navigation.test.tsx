import Navigation, {Properties} from './Navigation';
import NavigationModel from '../NavigationModel';
import {render, RenderResult} from '@testing-library/react';
import Container from '../DependencyInjection/Container';
import NavigationAdapter from './NavigationAdapter';
import {mock} from 'jest-mock-extended';
import TabModel from './TabModel';

jest.mock('../DependencyInjection/Container', function () {
  return {controller: {attach: jest.fn()}};
});

jest.mock('./Tab', function () {
  return function (props: Properties): JSX.Element {
    return <div>test:Tab:{JSON.stringify(props)}</div>;
  };
});

describe(Navigation, function () {
  beforeEach(function () {
    Container.adapter = mock<NavigationAdapter>();
  });

  function createUi(model: NavigationModel): RenderResult {
    (Container.controller.attach as jest.Mock).mockImplementation(function (view: Navigation) {
      view.model = model;
    });
    return render(<Navigation/>);
  }

  it('should display the navigation tab', function () {
    const model: NavigationModel = new NavigationModel();
    const tab: TabModel = new TabModel();
    tab.label = 'test::tabButton:';
    model.navigationTabs = [tab];

    const result: RenderResult = createUi(model);

    expect(result.container.innerHTML).not.toContain('class="active"');
    expect(result.container.innerHTML).toContain('test:Tab:');
    expect(result.container.innerHTML).toContain('test::tabButton:');
  });
});
