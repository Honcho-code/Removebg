import React from 'react'
import Navber from '../Components/Navber'
import Header from '../Components/Header'
import About from '../Components/About'
import Bgslider from '../Components/Bgslider'
import Reviews from '../Components/Reviews'
import Upload from '../Components/Upload'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className='p-4 md:px-25'>
      <Navber />
      <Header />
      <About />
      <Bgslider />
      <Reviews />
      <Upload />
      <Footer />
    </div>
  )
}

export default Home