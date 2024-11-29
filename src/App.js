import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Login from './pages/login';
import Event from './pages/CreateEvent';
import EditFormEvent from './components/EditFormEvent';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InscriptionForm from './components/InscriptionForm';

function App() {
  const token = localStorage.getItem("token");
console.log(token);

  return (
    <BrowserRouter>
    <Routes>
    
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard"  element={token ? <Dashboard />:<Login/>} />
      <Route path="/createEvent" element={<Event />} />
      <Route path="/edit/:id" element={<EditFormEvent />} />
      <Route path="/ins" element={<InscriptionForm />} />
    </Routes>
   
  </BrowserRouter>
  );
}

export default App;
