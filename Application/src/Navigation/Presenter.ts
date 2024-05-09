import {LoadResponse} from 'Core/Navigation/UseCase/NavigationInteractor';
import ViewModel from '../ViewModel';

export default interface Presenter {
    present(response: LoadResponse): ViewModel;
}
