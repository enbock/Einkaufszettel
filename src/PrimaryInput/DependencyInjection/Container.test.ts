import Container, {PrimaryInputContainer} from './Container';
import PrimaryInputController from '../React/PrimaryInputController';

describe(PrimaryInputContainer, function () {
  it('should provide the controller', function () {
    expect(Container.controller).toBeInstanceOf(PrimaryInputController);
  });
});
