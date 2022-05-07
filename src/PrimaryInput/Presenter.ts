import {LoadResponse} from './LoadInteractor';
import ViewModel from '../ViewModel';

export default interface Presenter {
    present(response: LoadResponse): ViewModel;
}
