import PrimaryInput from './PrimaryInput';
import PrimaryInputModel from './PrimaryInputModel';
import {fireEvent, render, RenderResult} from '@testing-library/react';
import Container from '../DependencyInjection/Container';
import GlobalContainer from '../../DependencyInjection/Container';

jest.mock('../DependencyInjection/Container', function () {
  return {controller: {attach: jest.fn()}};
});
jest.mock('../../DependencyInjection/Container', function () {
  return {
    inputAdapter: {
      onInputChange: jest.fn(),
      onSubmit: jest.fn(),
      onDiscard: jest.fn()
    }
  };
});

describe(PrimaryInput, function () {
  let model: PrimaryInputModel;

  beforeEach(function () {
    model = new PrimaryInputModel();
    (Container.controller.attach as jest.Mock).mockImplementation(attachModel);
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

    expect(GlobalContainer.inputAdapter.onInputChange).toBeCalledWith('test::newValue:');
  });

  it('should call the adapter when submit button is pressed', function () {
    model.showSubmitButton = true;
    const result: RenderResult = renderUi();
    const button: Element = result.container.querySelector('button[name="submit"]') as Element;

    fireEvent.click(button);

    expect(GlobalContainer.inputAdapter.onSubmit).toBeCalled();
  });

  it('should call the adapter when discard button is pressed', function () {
    model.showDiscardButton = true;
    const result: RenderResult = renderUi();
    const button: Element = result.container.querySelector('button[name="discard"]') as Element;

    fireEvent.click(button);

    expect(GlobalContainer.inputAdapter.onDiscard).toBeCalled();
  });
});
