import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import SignUp from './components/signup';
import ForgotPassword from './components/forgot_password';


function App() {
  const token = localStorage.getItem('access_token');



  if (token) {return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home/>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  );
  }else {
    return (
      <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path='/forgotpassword' element={<ForgotPassword/>}>
          
        </Route>
        <Route exact path="/signup" element={<SignUp/>}>

        </Route>

      </Routes>
    </BrowserRouter>
        )
  }
  
}
export default App;
