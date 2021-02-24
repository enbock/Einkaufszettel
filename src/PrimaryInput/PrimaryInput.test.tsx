import PrimaryInput, {Adapter} from './PrimaryInput';
import PrimaryInputModel from './PrimaryInputModel';
import {fireEvent, render, RenderResult} from '@testing-library/react';
import PrimaryInputAdapter from './PrimaryInputAdapter';
import Container from './DependcyInjection/Conatiner';

jest.mock('./DependcyInjection/Conatiner', function () {
  return {adapter: null, controller: {attach: jest.fn()}};
});

describe(PrimaryInput, function () {
  let model: PrimaryInputModel, adapter: Adapter;

  beforeEach(function () {
    model = new PrimaryInputModel();
    adapter = new PrimaryInputAdapter();
    adapter.onDiscard = jest.fn();
    adapter.onInputChange = jest.fn();
    adapter.onSubmit = jest.fn();
    Container.adapter = adapter;
    Container.controller.attach.mockImplementation(attachModel);
  });

  function attachModel(view: PrimaryInput): void {
    view.model = model;
  }

  it('should display current input value', function () {
    model.inputValue = 'test::inputValue:';

    const result: RenderResult = renderUi();

    expect(result.container.innerHTML).toContain('test::inputValue:');
  });

  function renderUi() {
    return render(<PrimaryInput/>);
  }

  it('should call the adapter when input is changed', function () {
    const result: RenderResult = renderUi();
    const inputField: Element = result.container.querySelector('input[name="editLine"]') as Element;

    fireEvent.change(inputField, {target: {value: 'test::newValue:'}});

    expect(adapter.onInputChange).toBeCalledWith('test::newValue:');
  });

  it('should call the adapter when submit button is pressed', function () {
    const result: RenderResult = renderUi();
    const button: Element = result.container.querySelector('button[name="submit"]') as Element;

    fireEvent.click(button);

    expect(adapter.onSubmit).toBeCalled();
  });

  it('should call the adapter when discard button is pressed', function () {
    const result: RenderResult = renderUi();
    const button: Element = result.container.querySelector('button[name="discard"]') as Element;

    fireEvent.click(button);

    expect(adapter.onDiscard).toBeCalled();
  });
});
