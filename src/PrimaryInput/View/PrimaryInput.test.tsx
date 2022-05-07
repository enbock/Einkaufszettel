import PrimaryInput from './PrimaryInput';
import PrimaryInputModel from './PrimaryInputModel';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import PrimaryInputAdapter from '../PrimaryInputAdapter';
import {mock, MockProxy} from 'jest-mock-extended';
import {fireEvent} from '@testing-library/dom';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';

describe(PrimaryInput, function () {
    let model: PrimaryInputModel,
        adapter: PrimaryInputAdapter & MockProxy<PrimaryInputAdapter>
    ;

    beforeEach(function () {
        model = new PrimaryInputModel();
        adapter = mock<PrimaryInputAdapter>();
    });

    function renderUi(): HTMLElement {
        ViewInjection(PrimaryInput, adapter);
        const view: PrimaryInput = TestRenderer.render(<PrimaryInput/>) as PrimaryInput;
        view.model = model;

        return view;
    }

    it('should display current input value', function () {
        model.inputValue = 'test::inputValue:';

        const result: HTMLElement = renderUi();

        expect(result).toContainHTML('test::inputValue:');
    });

    it('should call the adapter when input is changed', function () {
        const result: HTMLElement = renderUi();
        const inputField: Element = result.querySelector('input[name="editLine"]') as Element;

        fireEvent.change(inputField, {target: {value: 'test::newValue:'}});

        expect(adapter.onInputChange).toBeCalledWith('test::newValue:');
    });

    it('should call the adapter when submit button is pressed', function () {
        model.showSubmitButton = true;
        const result: HTMLElement = renderUi();
        const button: Element = result.querySelector('button[name="submit"]') as Element;

        fireEvent.click(button);

        expect(adapter.onSubmit).toBeCalled();
    });

    it('should call the adapter when discard button is pressed', function () {
        model.showDiscardButton = true;
        const result: HTMLElement = renderUi();
        const button: Element = result.querySelector('button[name="discard"]') as Element;

        fireEvent.click(button);

        expect(adapter.onDiscard).toBeCalled();
    });
});
