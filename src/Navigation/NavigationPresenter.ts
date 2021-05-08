import {LoadResponse} from './NavigationInteractor';
import NavigationModel from './NavigationModel';

export default class NavigationPresenter {
  public present(response: LoadResponse): NavigationModel {
    console.log('TODO: Presenter', response);
    return new NavigationModel();
  }
}
