import Entry, {Adapter} from './Entry';
import {fireEvent, render, RenderResult} from '@testing-library/react';
import EntryModel from './EntryModel';

describe(Entry, function () {
  let adapter: Adapter, model: EntryModel;

  beforeEach(function () {
    adapter = {onEntryButtonClick: jest.fn()};
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
});
