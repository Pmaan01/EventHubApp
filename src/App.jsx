import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import CreateEvent from "./pages/CreateEvent";
import EventDetails from './pages/EventDetails';
import AllEvents from './pages/AllEvents.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/create-event" element={<CreateEvent/>}/>
        <Route path="/events" element={<AllEvents />} />


      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}
  

export default App
