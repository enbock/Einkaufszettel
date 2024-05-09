import PrimaryInput from './PrimaryInput';
import PrimaryInputModel from './PrimaryInputModel';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import PrimaryInputAdapter from '../PrimaryInputAdapter';
import {fireEvent} from '@testing-library/dom';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';

describe('PrimaryInput', function (): void {
    let model: PrimaryInputModel,
        adapter: Mocked<PrimaryInputAdapter>
    ;

    beforeEach(function (): void {
        model = new PrimaryInputModel();
        adapter = mock<PrimaryInputAdapter>();
    });

    function renderUi(): HTMLElement {
        ViewInjection(PrimaryInput, adapter);
        const view: PrimaryInput = TestRenderer.render(<PrimaryInput/>) as PrimaryInput;
        view.model = model;

        return view;
    }

    it('should display current input value', async function (): Promise<void> {
        model.inputValue = 'test::inputValue:';

        const result: HTMLElement = renderUi();

        expect(result.innerHTML).toContain('test::inputValue:');
    });

    it('should call the adapter when input is changed', async function (): Promise<void> {
        const result: HTMLElement = renderUi();
        const inputField: Element = result.querySelector('input[name="editLine"]') as Element;

        fireEvent.change(inputField, {target: {value: 'test::newValue:'}});

        expect(adapter.onInputChange).toHaveBeenCalledWith('test::newValue:');
    });

    it('should call the adapter when submit button is pressed', async function (): Promise<void> {
        model.showSubmitButton = true;
        const result: HTMLElement = renderUi();
        const button: Element = result.querySelector('button[name="submit"]') as Element;

        fireEvent.click(button);

        expect(adapter.onSubmit).toHaveBeenCalled();
    });

    it('should call the adapter when delete button is pressed', async function () {
        model.showDeleteButton = true;
        const result: HTMLElement = renderUi();
        const button: Element = result.querySelector('button[name="delete"]') as Element;

        fireEvent.click(button);

        expect(adapter.onDelete).toHaveBeenCalled();
    });

    it('should call the adapter when discard button is pressed', async function () {
        model.showDiscardButton = true;
        const result: HTMLElement = renderUi();
        const button: Element = result.querySelector('button[name="discard"]') as Element;

        fireEvent.click(button);

        expect(adapter.onDiscard).toHaveBeenCalled();
    });
});
