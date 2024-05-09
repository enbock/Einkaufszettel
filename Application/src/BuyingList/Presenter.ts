import {Response} from 'Core/BuyingList/BuyingListLoadUseCase/BuyingListLoadInteractor';
import ViewModel from '../ViewModel';

export default interface Presenter {
    presentLoadResponse(response: Response): ViewModel;
}
