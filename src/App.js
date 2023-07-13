import './App.css';
import React,{useContext} from 'react';
import { Switch, Route  } from 'react-router-dom';
import Auth from './Authentication/Auth';
import AuthContext from './Components/store/AuthContext';
import ProfileForm from './Components/Layout/ProfileForm';
import ProfileComplete from './Components/Layout/ProfileComplete';
import ForgotPassword from './Components/Layout/ForgotPassword';

const App=()=> {
  const ctx=useContext(AuthContext);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {!ctx.isAuthenticate?<Auth/>:<ProfileForm/>}
        </Route>
        <Route path="/profileCompleteForm" exact>
          {!ctx.isAuthenticate?<Auth/>:<ProfileComplete/>}
        </Route>
        <Route path="/ForgotPassword">
           <ForgotPassword/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
