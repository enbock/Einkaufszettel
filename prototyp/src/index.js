import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Theme/Primary.css';
import Navigation from './Navigation/Navigation';
import PrimaryInput from './PrimaryInput/PrimaryInput';
import EntireList from './EntireList/EntireList';

ReactDOM.render(
  <StrictMode>
    <sl-container>
      <Navigation/>
      <PrimaryInput/>
      <EntireList/>
    </sl-container>
  </StrictMode>,
  document.getElementById('shopping-list')
);
