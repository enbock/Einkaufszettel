import Container, {PrimaryInputContainer} from './Container';
import PrimaryInputAdapter from '../React/PrimaryInputAdapter';
import PrimaryInputController from '../React/PrimaryInputController';

describe(PrimaryInputContainer, function () {
  it('should provide the adapter', function () {
    expect(Container.adapter).toBeInstanceOf(PrimaryInputAdapter);
  });

  it('should provide the controller', function () {
    expect(Container.controller).toBeInstanceOf(PrimaryInputController);
  });
});
