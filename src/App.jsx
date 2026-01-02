import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Result from './Pages/Result.jsx'
import Buycredit from './Pages/Buycredit.jsx'
import {ToastContainer} from 'react-toastify'
// import Footer from './Components/Footer.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buycredit' element={<Buycredit />} />
      </Routes>
      {/* <Footer/> */}
      <ToastContainer theme='light'/>
    </BrowserRouter>
      
  )
}

export default App