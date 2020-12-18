import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeScreen from './screens/WelcomeScreen.js';
import GameScreen from './screens/GameScreen.js';
import CreateScreen from './screens/CreateScreen.js';
import JoinScreen from './screens/JoinScreen.js';


function App() {




  return (
    <Router>
      <Route path='/' component={WelcomeScreen} exact/>
      <Route path='/create' component={CreateScreen} />
      <Route path='/join' component={JoinScreen} />
      <Route path='/game' component={GameScreen} />
    </Router>
  );
}
export default App;