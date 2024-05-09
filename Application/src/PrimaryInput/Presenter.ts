import {LoadResponse} from 'Core/PrimaryInput/UseCase/LoadInteractor';
import ViewModel from '../ViewModel';

export default interface Presenter {
    present(response: LoadResponse): ViewModel;
}
