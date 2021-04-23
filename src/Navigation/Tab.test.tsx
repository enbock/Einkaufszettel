import Tab, {Adapter} from './Tab';
import {fireEvent, render, RenderResult} from '@testing-library/react';
import TabModel from './TabModel';
import {mock} from 'jest-mock-extended';

describe(Tab, function () {
  let adapter: Adapter = mock<Adapter>();

  function createUi(model: TabModel): RenderResult {
    return render(<Tab model={model} adapter={adapter}/>);
  }

  it('should display the navigation tab', function () {
    const model: TabModel = new TabModel();
    model.isActive = false;
    model.label = 'test::label:';

    const result: RenderResult = createUi(model);

    expect(result.container.innerHTML).not.toContain('class="active"');
    expect(result.container.innerHTML).toContain('test::label:');
  });

  it('should mark the active tab', function () {
    const model: TabModel = new TabModel();
    model.isActive = true;

    const result: RenderResult = createUi(model);

    expect(result.container.innerHTML).toContain('class="active"');
  });

  it('should run adapter function with tab name on click', function () {
    const model: TabModel = new TabModel();
    model.name = 'test::tabName:';

    const result: RenderResult = createUi(model);
    const button: Element = result.container.getElementsByTagName('button').item(0) as Element;
    fireEvent.click(button);

    expect(adapter.onNavigationClick).toBeCalledWith('test::tabName:');
  });
});
