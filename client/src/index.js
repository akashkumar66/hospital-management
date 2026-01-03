import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import routes from './router.js';
import {Provider} from "react-redux";
import Store from './Userreducers/Store.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
     <RouterProvider router={routes}/>
   
  </Provider>
);

