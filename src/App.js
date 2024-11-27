import logo from './logo.svg';
import './App.css';
// import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/register" element={<Register />} />
     
    </Routes>
   
  </BrowserRouter>
  );
}

export default App;
