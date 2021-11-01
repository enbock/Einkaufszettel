import Entry, {Adapter} from './Entry';
import {fireEvent, render, RenderResult} from '@testing-library/react';
import EntryModel from './EntryModel';
import {mock, MockProxy} from 'jest-mock-extended';

describe(Entry, function () {
  let adapter: Adapter & MockProxy<Adapter>,
    model: EntryModel
  ;

  beforeEach(function () {
    adapter = mock<Adapter>();
    model = new EntryModel();
  });

  function renderUi(): RenderResult {
    return render(<Entry adapter={adapter} model={model}/>);
  }

  it('should show an entry', function () {
    model.label = 'test::flour:';
    const result: RenderResult = renderUi();
    expect(result.container.outerHTML).toContain('test::flour:');
  });

  it('should trigger the adapter on click of the button', function () {
    model.id = 'test::id:';
    const result: RenderResult = renderUi();
    const button: Element = result.container.getElementsByTagName('button').item(0) as Element;
    fireEvent.click(button);

    expect(adapter.onEntryButtonClick).toBeCalledWith('test::id:');
  });

  it('should trigger the adapter on click of the label', function () {
    model.id = 'test::id:';
    const result: RenderResult = renderUi();
    const button: Element = result.container.getElementsByTagName('list-label').item(0) as Element;
    fireEvent.click(button);

    expect(adapter.onSelectClick).toBeCalledWith('test::id:');
  });
});
