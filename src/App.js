import Nav from './Components/Nav';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Components/home';
import About from './Components/about';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import { Login } from './Components/Login';
import SignUp from './Components/SignUp';
import React, { useState } from 'react'
import EmailVer from './Components/EmailVer';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }  
  return (
    <>
      <NoteState>
        <Router>
          <Nav />
          <Alert alert={alert}/>
          <div className="container pt-4 mt-3">
            <Routes>
              <Route exact path="/" element={<SignUp showAlert={showAlert}/>} />
              <Route exact path="/home" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/auth/:id/verify/:token" element={<EmailVer showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
