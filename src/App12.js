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
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <BrowserRouter>
            <div className = "full">
            <div>
            <toggleButton />
            </div>
              <Navbar />
                <Route exact path="/" component={ Home } />
                <Route exact path="/register" component={ loginProtect(Register) } />
                <Route exact path="/login" component={ loginProtect(Login) } />
                <Route exact path="/forget" component={ loginProtect(forget) } />
                <Route exact path="/create" component={requireAuth(createUser)} />
                <Route exact path="/search" component={requireAuth(search)} /> 
                <Route exact path="/delete" component={requireAuth(deleteuser)} />  
                <Route exact path="/update" component={requireAuth(update)} /> 
                <Route exact path="/task" component={requireAuth(taskbar)} /> 
                <Route exact path="/taskdash" component={requireAuth(taskdash)} /> 
                <Route exact path="/taskSearch" component={requireAuth(taskSearch)} />
                <Route exact path="/newtask" component={requireAuth(newtask)} />  
                <Route exact path="/taskupdate" component={requireAuth(taskupdate)} /> 
                <Route exact path="/statusupdate" component={requireAuth(statusupdate)} />  
                <Route exact path="/taskdelete" component={requireAuth(taskDelete)} />  
                <Route exact path="/dash" component={requireAuth(dashPie)} />  
            </div>
          </BrowserRouter>
        </Provider>
    );
  }
}





<Route exact path="/" component={ Home } />
                <Route exact path="/register" render={() => (<Register cookies={this.props.cookies}/>)} />
                <Route exact path="/login" render={() => (<Login cookies={this.props.cookies}/>)} />
                <Route exact path="/forget" component={ LoginProtect(Forget) } />
                <Route exact path="/create" render={() => (<CreateUser cookies={this.props.cookies}/>)} />
                <Route exact path="/search" render={() => (<Search cookies={this.props.cookies}/>)} />
                <Route exact path="/delete" render={() => (<DeleteUser cookies={this.props.cookies}/>)} />
                <Route exact path="/update" render={() => (<Update cookies={this.props.cookies}/>)} /> 
                <Route exact path="/task" render={() => (<Taskbar cookies={this.props.cookies}/>)} />
                <Route exact path="/taskdash" render={() => (<Taskdash cookies={this.props.cookies}/>)} />
                <Route exact path="/taskSearch" render={() => (<TaskSearch cookies={this.props.cookies}/>)} />
                <Route exact path="/newtask" render={() => (<Newtask cookies={this.props.cookies}/>)} /> 
                <Route exact path="/taskupdate" render={() => (<TaskUpdate cookies={this.props.cookies}/>)} />
                <Route exact path="/statusupdate" render={() => (<StatusUpdate cookies={this.props.cookies}/>)} />
                <Route exact path="/taskdelete" render={() => (<TaskDelete cookies={this.props.cookies}/>)} /> 
                <Route exact path="/dash" render={() => (<DashPie cookies={this.props.cookies}/>)} /> 

export default App;