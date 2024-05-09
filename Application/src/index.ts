import 'Application/RegisterServiceWorker';
import BuyingList from './BuyingList/View/BuyingList';
import ShadowViewConnector from './ShadowViewConnector';
import GlobalContainer from './DependencyInjection/Container';
import PrimaryInput from './PrimaryInput/View/PrimaryInput';
import Navigation from './Navigation/View/Navigation';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import ShoppingList from './ShoppingList/View/ShoppingList';

BuyingList.componentReceiver = new ShadowViewConnector(GlobalContainer.buyingListController);
ViewInjection(BuyingList, GlobalContainer.listAdapter);

PrimaryInput.componentReceiver = new ShadowViewConnector(GlobalContainer.primaryInputController);
ViewInjection(PrimaryInput, GlobalContainer.primaryInputAdapter);

Navigation.componentReceiver = new ShadowViewConnector(GlobalContainer.navigationController);
ViewInjection(Navigation, GlobalContainer.navigationAdapter);

ShoppingList.componentReceiver = new ShadowViewConnector(GlobalContainer.controller);

GlobalContainer.startUp.start();
