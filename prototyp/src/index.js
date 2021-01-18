import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Theme/Default.css';
import Navigation from './Navigation/Navigation';
import PrimaryInput from './PrimaryInput/PrimaryInput';
import EntireList from './EntireList/EntireList';

const adapter = Navigation.adapter;
ReactDOM.render(
  <StrictMode>
    <sl-container>
      <Navigation adapter={adapter}/>
      <PrimaryInput/>
      <EntireList adapter={adapter}/>
    </sl-container>
  </StrictMode>,
  document.getElementById('shopping-list')
);
