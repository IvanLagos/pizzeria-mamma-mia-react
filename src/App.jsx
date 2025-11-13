import { useMemo, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponent from './assets/components/navbar/NavBarComponent';
import HomeComponent from './assets/components/home/HomeComponent';
import FooterComponent from './assets/components/footer/FooterComponent';
import RegisterComponent from './assets/components/register/RegisterComponent';
import LoginComponent from './assets/components/login/LoginComponent';
import CartComponent from "./assets/components/cart/CartComponent.jsx";
import { formatCLP } from "./assets/utils/formatCLP";

function App() {
  const [vista, setVista] = useState('home');
  const [cart, setCart] = useState([]);

  const total = useMemo(
    () => cart.reduce((acc, p) => acc + p.price * p.count, 0),
    [cart]

  );

  const addToCart = (pizza) => {
    setCart(prev => {
      const found = prev.find(x => x.id === pizza.id);
      if (found) return prev.map(x => x.id === pizza.id ? ({ ...x, count: x.count + 1 }) : x);
      return [...prev, { id: pizza.id, name: pizza.name, price: pizza.price, count: 1, img: pizza.img }];
    });

  };

  const inc = (id) =>
    setCart(prev => prev.map(p => p.id === id ? ({ ...p, count: p.count + 1 }) : p));

  const dec = (id) =>
    setCart(prev =>
      prev
        .map(p => p.id === id ? ({ ...p, count: p.count - 1 }) : p)
        .filter(p => p.count > 0)
    );

  const handlePay = () => {
    alert(`¡Gracias por tu compra! Estás pagando ${formatCLP(total)} .`);
  };

  return (
    <div className="app-container">

      <NavBarComponent cambiarVista={setVista} total={total} />

      <div className="content-wrapper">
        {vista === 'home' && <HomeComponent onAddToCart={addToCart} />}
        {vista === 'register' && <RegisterComponent />}
        {vista === 'login' && <LoginComponent />}
        {vista === 'cart' && (
          <CartComponent
            items={cart}
            onInc={inc}
            onDec={dec}
            total={total}
            onPay={handlePay}
          />
        )}
      </div>

      <FooterComponent />
    </div>
  );
}

export default App;
