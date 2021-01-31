import EntireList from './EntireList';
import {render, RenderResult} from '@testing-library/react';
import EntireListModel from './EntireListModel';
import EntryModel from './EntryModel';
import Container from './DependencyInjection/Container';

jest.mock('./DependencyInjection/Container', function () {
  return {controller: {attach: jest.fn()}, adapter: 'test::Adapter:'};
});

jest.mock('./Entry', function () {
  return function (props:any):JSX.Element {
    return <div>::test:Entry:{JSON.stringify(props.model)}{props.adapter}</div>;
  }
})

describe(EntireList, function () {
  it('should show the list', function () {
    const entry1: EntryModel = new EntryModel();
    entry1.id = 'id-1';
    entry1.label = 'test::entry1:';
    const entry2: EntryModel = new EntryModel();
    entry2.id = 'id-2';
    entry2.label = 'test::entry2:';
    const model: EntireListModel = new EntireListModel();
    model.list = [entry1, entry2];
    let viewInstance: EntireList = new EntireList({});

    (Container.controller.attach as jest.Mock).mockImplementation(
      function (view: EntireList) {
        viewInstance = view;
      }
    );

    const result: RenderResult = render(<EntireList/>);
    viewInstance.model = model;

    expect(result.container.innerHTML).toContain('test::entry1:');
    expect(result.container.innerHTML).toContain('test::entry2:');
    expect(result.container.innerHTML).toContain('test::Adapter:');
  });
});
