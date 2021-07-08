import React from 'react';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { NewPost } from './pages/NewPost';
import { NewPhoto } from './pages/NewPhoto';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Posts } from './pages/Posts';
import "./styles/styles.scss";

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/user/signup" component={SignUp} />
          <Route path="/user/home" component={Home} />
          <Route path="/user/newpost" component={NewPost} />
          <Route path="/user/newphoto" component={NewPhoto} />
          <Route path="/user/posts" component={Posts} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
