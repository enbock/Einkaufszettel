import PrimaryInput, {Adapter} from '../PrimaryInput';
import PrimaryInputAdapter from '../PrimaryInputAdapter';

export class PrimaryInputContainer {
  public adapter: Adapter = new PrimaryInputAdapter();
  public controller: any = {
    attach: (view: PrimaryInput) => {
      /** TODO Controller */
    }
  };
}

const Container: PrimaryInputContainer = new PrimaryInputContainer();
export default Container;
