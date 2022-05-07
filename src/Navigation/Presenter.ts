import {LoadResponse} from './NavigationInteractor';
import ViewModel from '../ViewModel';

export default interface Presenter {
    present(response: LoadResponse): ViewModel;
}
