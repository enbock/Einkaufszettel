import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './Navigation/Navigation';
import PrimaryInput from './PrimaryInput/PrimaryInput';
import PrimaryList from './PrimaryList';

ReactDOM.render(
  <StrictMode>
    <sl-container>
      <Navigation/>
      <PrimaryInput/>
      <PrimaryList/>
    </sl-container>
  </StrictMode>,
  document.getElementById('shopping-list')
);
