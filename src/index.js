/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 04/05/2021 - 15:48:41
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import 'bulma/css/bulma.min.css';
import 'react-block-ui/style.css';


const options = {
  position: positions.MIDDLE,
  timeout: 4000,
  offset: '100px',
  transition: transitions.SCALE,
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
