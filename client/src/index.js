import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import App from './App';
import Register from './Screens/Register';
import Activate from './Screens/Activation';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/" 
        exact 
        render={(props) => <App {...props} />}
      />

      <Route
        path="/register"
        exact
        render={(props) => <Register {...props} />}
      />

      <Route
        path="/users/activate/:token"
        exact
        render={(props) => <Activate {...props} />}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);