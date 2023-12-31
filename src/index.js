import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { AuthProvider } from './Components/store/AuthContext';
import {BrowserRouter} from 'react-router-dom';
//import { ExpenseContextProvider } from './Components/store/ExpenseContext';
import { Provider } from 'react-redux';
import store from './Components/ReduxStore';

//React Bootstrap Configurarion
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {/* <AuthProvider>
          <ExpenseContextProvider>
            <App />
          </ExpenseContextProvider>
        </AuthProvider> */}
        <Provider store={store}>
          <App/>
        </Provider>

    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
