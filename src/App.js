import "./styles/reset.css";
import "./styles/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import Timeline from "./containers/Timeline"; 
import Publish from "./components/publish";

export default function App() {

  const [token, setToken] = useState('');
  const context = {token, setToken}

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={context}>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/timeline' element={<Timeline/>}/>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}