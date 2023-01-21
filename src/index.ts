import BuyingListContainer from './BuyingList/DependencyInjection/Container';
import BuyingList from './BuyingList/View/BuyingList';
import ShadowViewConnector from './ShadowViewConnector';
import GlobalContainer from './DependencyInjection/Container';
import PrimaryInput from './PrimaryInput/View/PrimaryInput';
import Navigation from './Navigation/View/Navigation';
import PrimaryInputContainer from './PrimaryInput/DependencyInjection/Container';
import NavigationContainer from './Navigation/DependencyInjection/Container';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import ShoppingList from './ShoppingList/View/ShoppingList';

BuyingList.componentReceiver = new ShadowViewConnector(BuyingListContainer.controller);
ViewInjection(BuyingList, GlobalContainer.listAdapter);

PrimaryInput.componentReceiver = new ShadowViewConnector(PrimaryInputContainer.controller);
ViewInjection(PrimaryInput, GlobalContainer.primaryInputAdapter);

Navigation.componentReceiver = new ShadowViewConnector(NavigationContainer.controller);
ViewInjection(Navigation, GlobalContainer.navigationAdapter);

ShoppingList.componentReceiver = new ShadowViewConnector(GlobalContainer.controller);

GlobalContainer.startUp.start();
