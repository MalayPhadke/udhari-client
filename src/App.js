import './App.css';
import React, {Component} from "react";
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import MainScreen from './components/MainScreen';

//protect home route //done
//email verification
//poke feature
//adding profile picture

class App extends Component {
  constructor(){
    super()
    this.state = {
      isLoggedIn: false,
      username: null
    }
    this.updateUser = this.updateUser.bind(this);
  }
  updateUser (userObject) {
    this.setState(userObject)
  }
  
  render() {
    return (
      <div className="App"> 
        <BrowserRouter>
        <Routes>
        <Route
          exact path="/"
          element={<Login updateUser={this.updateUser} />} 
        />
        <Route
          path="/register"
          element={<Register updateUser={this.updateUser} />}
        />
        <Route
          path="/home"
          element={<MainScreen isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}
        />
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

// img error in MainListTile component

export default App;