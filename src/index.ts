import './index.css';
import BuyingListContainer from './BuyingList/DependencyInjection/Container';
import BuyingList from './BuyingList/View/BuyingList';
import ShadowViewConnector from './ShadowViewConnector';
import GlobalContainer from './DependencyInjection/Container';
import PrimaryInput from './PrimaryInput/View/PrimaryInput';
import Navigation from './Navigation/View/Navigation';
import PrimaryInputContainer from './PrimaryInput/DependencyInjection/Container';
import NavigationContainer from './Navigation/DependencyInjection/Container';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';

BuyingList.componentReceiver = new ShadowViewConnector(BuyingListContainer.controller);
ViewInjection(BuyingList, BuyingListContainer.adapter);

PrimaryInput.componentReceiver = new ShadowViewConnector(PrimaryInputContainer.controller);
ViewInjection(PrimaryInput, PrimaryInputContainer.adapter);

Navigation.componentReceiver = new ShadowViewConnector(NavigationContainer.controller);
ViewInjection(Navigation, NavigationContainer.adapter);

GlobalContainer.startUp.start();
