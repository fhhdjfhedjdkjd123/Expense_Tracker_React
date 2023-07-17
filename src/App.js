import './App.css';
import React,{useContext} from 'react';
import { Switch, Route  } from 'react-router-dom';
import Auth from './Authentication/Auth';
//import AuthContext from './Components/store/AuthContext';
import ProfileForm from './Components/Layout/ProfileForm';
import ProfileComplete from './Components/Layout/ProfileComplete';
import ForgotPassword from './Components/Layout/ForgotPassword';
import { useSelector } from 'react-redux';

const App=()=> {
  //const ctx=useContext(AuthContext);
  const isAuthenticate = useSelector((state)=>state.authReducer.isAuthenticate);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {!isAuthenticate?<Auth/>:<ProfileForm/>}
        </Route>
        <Route path="/profileCompleteForm" exact>
          {!isAuthenticate?<Auth/>:<ProfileComplete/>}
        </Route>
        <Route path="/ForgotPassword" exact>
           <ForgotPassword/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
