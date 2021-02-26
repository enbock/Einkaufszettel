import PrimaryInputPresenter, {PresentableResponse} from './PrimaryInputPresenter';
import PrimaryInputModel from './PrimaryInputModel';

describe(PrimaryInputPresenter, function () {
  it('should present response data', function () {
    const response: PresentableResponse = {inputValue: 'test::inputValue'};
    const expectedModel: PrimaryInputModel = new PrimaryInputModel();
    expectedModel.inputValue = 'test::inputValue';

    const result: PrimaryInputModel = (new PrimaryInputPresenter()).present(response);

    expect(result).toEqual(expectedModel);
  });
});
