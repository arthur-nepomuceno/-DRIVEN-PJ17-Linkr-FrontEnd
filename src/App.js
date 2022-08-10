import "./styles/reset.css";
import "./styles/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./containers/SignUp";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}