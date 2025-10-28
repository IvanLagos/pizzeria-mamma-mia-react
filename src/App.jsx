import React from 'react'
import './App.css'
import NavBarComponent from './assets/components/navbar/NavBarComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeComponent from './assets/components/home/HomeComponent';
import FooterComponent from './assets/components/footer/footerComponent';

const App = () => { 
  return (
    <>
    <NavBarComponent/>
    <HomeComponent/>
    <FooterComponent/>
    </>
  )
}
export default App


