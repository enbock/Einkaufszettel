import Conatiner, {PrimaryInputContainer} from './Conatiner';
import PrimaryInputAdapter from '../PrimaryInputAdapter';
import PrimaryInputController from '../PrimaryInputController';

describe(PrimaryInputContainer, function () {
  it('should provide the adapter', function () {
    expect(Conatiner.adapter).toBeInstanceOf(PrimaryInputAdapter);
  });

  it('should provide the controller', function () {
    expect(Conatiner.controller).toBeInstanceOf(PrimaryInputController);
  });
});
