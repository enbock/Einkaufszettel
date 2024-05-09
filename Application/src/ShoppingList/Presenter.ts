import PageStateResponseModel from 'Core/ShoppingList/ActivePageUseCase/PageStateResponse/PageStateResponseModel';
import ViewModel from '../ViewModel';

export default interface Presenter {
    present(state: PageStateResponseModel): ViewModel;
}
