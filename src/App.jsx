import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponent from './assets/components/navbar/NavBarComponent';
import HomeComponent from './assets/components/home/HomeComponent';
import FooterComponent from './assets/components/footer/FooterComponent';
import Register from './assets/components/register/Register';
import Login from './assets/components/login/Login';

function App() {
  const [vista, setVista] = useState("home");

  return (
    <div className="app-container">
      <NavBarComponent cambiarVista={setVista} />

      <div className="content-wrapper">
        {vista === "home" && <HomeComponent />}
        {vista === "register" && <Register />}
        {vista === "login" && <Login />}
      </div>

      <FooterComponent />
    </div>
  );
}

export default App;
