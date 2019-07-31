import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import taskbar from './components/tasknavbar';
import taskSearch from './components/taskSearch';
import taskDelete from './components/taskDelete';
import statusupdate from './components/statusUpdate';
import newtask from './components/newtask';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import search from './components/search';
import deleteuser from './components/delete';
import update from './components/update';
import taskdash from './components/taskdash';
import requireAuth from './components/protectedRouter';
import forget from './components/forget';
import createUser from './components/createUser';
import loginProtect from './components/loginProtect';
import taskupdate from './components/taskUpdate';
import dashPie from './components/dashPie';
import NewNavbar from './components/newNavbar';
import EmailReset from './components/emailReset'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider, withCookies } from 'react-cookie';
import './App.css';

class App extends Component {
  render() {
    return (
      <CookiesProvider>
      <Provider store = { store }>
        <BrowserRouter>
            <div className = "full">
            <div>
            <toggleButton />
            </div>
                <Navbar cookies={this.props.cookies} />
                <Route exact path="/" component={ Home } />
                <Route exact path="/register" component={ withCookies(loginProtect(Register)) } />
                <Route exact path="/login" component={ withCookies(loginProtect(Login) )} />
                <Route exact path="/forget" component={ withCookies(loginProtect(forget)) } />
                <Route exact path="/create" component={withCookies(requireAuth(createUser))} />
                <Route exact path="/search" component={withCookies(requireAuth(search))} /> 
                <Route exact path="/delete" component={withCookies(requireAuth(deleteuser))} />  
                <Route exact path="/update" component={withCookies(requireAuth(update))} /> 
                <Route exact path="/task" component={withCookies(requireAuth(taskbar))} /> 
                <Route exact path="/taskdash" component={withCookies(requireAuth(taskdash))} /> 
                <Route exact path="/taskSearch" component={withCookies(requireAuth(taskSearch))} />
                <Route exact path="/newtask" component={withCookies(requireAuth(newtask))} />  
                <Route exact path="/taskupdate" component={withCookies(requireAuth(taskupdate))} /> 
                <Route exact path="/statusupdate" component={withCookies(requireAuth(statusupdate))} />  
                <Route exact path="/taskdelete" component={withCookies(requireAuth(taskDelete))} />  
                <Route exact path="/dash" component={withCookies(requireAuth(dashPie))} />
                <Route exact path="/emailreset" render={() => (<EmailReset cookies={this.props.cookies}/>)} /> 
            </div>
          </BrowserRouter>
        </Provider>
        </CookiesProvider>
    );
  }
}

export default withCookies(App);