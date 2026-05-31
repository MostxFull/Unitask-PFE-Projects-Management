import React from 'react'
import Navbar from '../../compenents/CopHome/header/Navbar'
import Hello from '../../compenents/CopHome/header/Home'
import Propose from '../../compenents/CopHome/body/propose/Propose'
import BodySeconde from '../../compenents/CopHome/body/secende/BodySecende'
import Communitie from '../../compenents/CopHome/body/community/Communitie'
import Footer from '../../compenents/CopHome/footer/Footer'
function Home() {
  return (
    <>
    <div className='px-10 bg-gradient-to-br from-blue-50 to-purple-50'>
      <Navbar/>
      <Hello/>
      <Propose/>
      <BodySeconde/>
      <Communitie/>
    </div>
    <Footer/>

    </>
  )
}

export default Home