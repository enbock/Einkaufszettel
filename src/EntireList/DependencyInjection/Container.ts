import EntireList from '../EntireList';
import EntireListAdapter from '../EntireListAdapter';

export class EntireListContainer {
  public readonly adapter: EntireListAdapter = new EntireListAdapter();
  public readonly controller = {
    attach: (view: EntireList) => {
      /*TODO Controller Task*/
    }
  };
}

const Container: EntireListContainer = new EntireListContainer();
export default Container;
