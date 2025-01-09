import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Service from './pages/Service/Service';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/service' element={<Service />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/*' element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
