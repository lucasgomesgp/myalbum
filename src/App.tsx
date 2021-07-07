import React from 'react';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/styles.scss";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/user/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>

    </AuthContextProvider>
  );
}

export default App;
