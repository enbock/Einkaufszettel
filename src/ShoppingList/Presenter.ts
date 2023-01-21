import PageStateResponseModel from './ActivePageInteractor/PageStateResponse/PageStateResponseModel';
import ViewModel from '../ViewModel';

export default interface Presenter {
    present(state: PageStateResponseModel): ViewModel;
}
