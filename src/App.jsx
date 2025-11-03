import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponent from './assets/components/navbar/NavBarComponent';
import HomeComponent from './assets/components/home/HomeComponent';
import FooterComponent from './assets/components/footer/FooterComponent';
import RegisterComponent from './assets/components/register/RegisterComponent';
import LoginComponent from './assets/components/login/LoginComponent';

function App() {
  const [vista, setVista] = useState("home");

  return (
    <div className="app-container">
      <NavBarComponent cambiarVista={setVista} />

      <div className="content-wrapper">
        {vista === "home" && <HomeComponent />}
        {vista === "register" && <RegisterComponent />}
        {vista === "login" && <LoginComponent />}
      </div>

      <FooterComponent />
    </div>
  );
}

export default App;
