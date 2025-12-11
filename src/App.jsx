import { useMemo, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBarComponent from "./assets/components/navbar/NavBarComponent";
import FooterComponent from "./assets/components/footer/FooterComponent";
import HomePage from "./assets/pages/HomePage.jsx";
import RegisterPage from "./assets/pages/RegisterPage.jsx";
import LoginPage from "./assets/pages/LoginPage.jsx";
import CartPage from "./assets/pages/CartPage.jsx";
import ProfilePage from "./assets/pages/ProfilePage.jsx";
import { formatCLP } from "./assets/utils/formatCLP";

const PrivateRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") === "false";
  });

  useEffect(() => {
    localStorage.setItem("token", token ? "true" : "false");
  }, [token]);

  const [cart, setCart] = useState([]);

  const total = useMemo(
    () => cart.reduce((acc, p) => acc + p.price * p.count, 0),
    [cart]
  );

  const addToCart = (pizza) => {
    setCart((prev) => {
      const found = prev.find((x) => x.id === pizza.id);
      if (found)
        return prev.map((x) =>
          x.id === pizza.id ? { ...x, count: x.count + 1 } : x
        );
      return [
        ...prev,
        {
          id: pizza.id,
          name: pizza.name,
          price: pizza.price,
          count: 1,
          img: pizza.img,
        },
      ];
    });
  };

  const inc = (id) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, count: p.count + 1 } : p))
    );

  const dec = (id) =>
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, count: p.count - 1 } : p))
        .filter((p) => p.count > 0)
    );

  const handlePay = () => {
    alert(`¡Gracias por tu compra! Estás pagando ${formatCLP(total)}.`);
  };

  return (
    <div className="app-container">
      <NavBarComponent total={total} token={token} setToken={setToken} />

      <div className="content-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={addToCart}
                token={token}
              />
            }
          />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/login" element={<LoginPage setToken={setToken} />} />

          <Route
            path="/cart"
            element={
              <PrivateRoute token={token}>
                <CartPage
                  items={cart}
                  onInc={inc}
                  onDec={dec}
                  total={total}
                  onPay={handlePay}
                  token={token}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute token={token}>
                <ProfilePage setToken={setToken} />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={
              <h2 className="text-center mt-5">
                404 - Página no encontrada
              </h2>
            }
          />
        </Routes>
      </div>

      <FooterComponent />
    </div>
  );
}

export default App;
