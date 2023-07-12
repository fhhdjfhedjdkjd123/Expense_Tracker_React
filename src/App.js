import './App.css';
import React,{useContext} from 'react';
import { Switch, Route  } from 'react-router-dom';
import Auth from './Authentication/Auth';
import AuthContext from './Components/store/AuthContext';
import ProfileForm from './Components/Layout/ProfileForm';
const App=()=> {
  const ctx=useContext(AuthContext);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {!ctx.isAuthenticate?<Auth/>:<ProfileForm/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
