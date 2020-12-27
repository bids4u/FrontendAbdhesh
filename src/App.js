import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Redirect,  Switch} from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Forget from './Auth/Forget-password';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard/dashboard';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import Reset from './Auth/Reset'
import Activate from './Auth/Activate';
import Quiz from './Dashboard/Quiz';
import Cquiz from './Dashboard/Cquiz';
import Rules from './Dashboard/Rules';
import Result from './Dashboard/Result';
import Pquestion from './Dashboard/Pquestion';
import MQuestion from './Dashboard/Mquestion';

function App() {
  return (
   
      <div className="app">
        <ToastContainer></ToastContainer>
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path="/" component={Login}/>
            <PublicRoute  path="/register" component={Register}/>
            <PublicRoute  path="/forget" component={Forget}/>
            <PublicRoute  path='/auth/reset-password/:id' component={Reset}/>
            <PublicRoute  path='/auth/activate/:id' component={Activate}/>
            <PrivateRoute  path="/dashboard" component={Dashboard}/>
            <PrivateRoute  path="/cquiz" component={Cquiz}/>
            <PrivateRoute  path="/quiz/:lang" component={Quiz}/>
            <PrivateRoute  path="/rules/:lang" component={Rules}/>
            <PrivateRoute  path="/result" component={Result}/>
            <PrivateRoute  path="/quest/" component={Pquestion}/>
            <PrivateRoute  path="/mquest/" component={MQuestion}/>
            <Redirect to="/"/>
          </Switch>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
