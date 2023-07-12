import './App.css';
import React from 'react';
import { Switch, Route  } from 'react-router-dom';
import Auth from './Authentication/Auth';
const App=()=> {
  return (
    <div>
      {/* <Switch>
        <Route path="/" exact> */}
          <Auth/>
        {/* </Route>
      </Switch> */}
    </div>
  );
}

export default App;
