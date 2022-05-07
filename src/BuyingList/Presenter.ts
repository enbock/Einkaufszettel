import {Response} from './BuyingListLoadInteractor';
import ViewModel from '../ViewModel';

export default interface Presenter {
    presentLoadResponse(response: Response): ViewModel;
}
