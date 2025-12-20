import { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBarComponent from "./assets/components/navbar/NavBarComponent";
import FooterComponent from "./assets/components/footer/FooterComponent";

import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";
import RegisterPage from "./assets/pages/RegisterPage";
import CartPage from "./assets/pages/CartPage";
import ProfilePage from "./assets/pages/ProfilePage";
import Pizza from "./assets/pages/Pizza";

import { useUser } from "./contexts/UserContext";

function App() {
  const { token } = useUser();

  // ✅ Carrito centralizado como antes
  const [cart, setCart] = useState([]);

  const total = useMemo(
    () => cart.reduce((acc, p) => acc + p.price * p.count, 0),
    [cart]
  );

  // ✅ Agregar al carrito (si existe, suma cantidad)
  const onAddToCart = (pizza) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === pizza.id);

      if (found) {
        return prev.map((p) =>
          p.id === pizza.id ? { ...p, count: p.count + 1 } : p
        );
      }

      return [...prev, { ...pizza, count: 1 }];
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBarComponent total={total} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={onAddToCart} />} />

          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <LoginPage />}
          />

          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <RegisterPage />}
          />

          <Route
            path="/cart"
            element={
              token ? (
                <CartPage cart={cart} setCart={setCart} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/profile"
            element={token ? <ProfilePage /> : <Navigate to="/login" />}
          />

          {/* ✅ Detalle; si quieres permitir agregar desde detalle */}
          <Route path="/pizza/:id" element={<Pizza onAddToCart={onAddToCart} />} />
        </Routes>
      </main>

      <FooterComponent />
    </div>
  );
}

export default App;
