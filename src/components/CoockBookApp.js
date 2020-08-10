import React from 'react';
import '../App.css';
import Navbar from './Navbar'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Authentication from './Authentication'

// components
import LoginPage from '../pages/LoginPage'
import SignupPage  from '../pages/SignupPage'
import Homepage from '../pages/Homepage'
import AddPost from '../pages/AddPost'
import RecipePage from '../pages/RecipePage'


function CoockBookApp() {
  return (
    <div className="App">
        <Router>
            <Navbar/>
              <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignupPage}/>
                <Authentication exact path="/addpost" component={AddPost}/>
                <Route exact path="/home/:recipe" component={RecipePage}/>
              </Switch>
        </Router>
    </div>
  );
}

export default CoockBookApp;
