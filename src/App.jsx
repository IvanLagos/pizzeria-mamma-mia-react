import { useEffect, useMemo, useState } from "react";
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
  const { isAuthenticated, getProfile, logout } = useUser();

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

  // ✅ Al iniciar: validar token guardado.
  // Si es inválido/expirado → cerrar sesión para evitar "sesión fantasma"
  useEffect(() => {
    const validateSession = async () => {
      if (!isAuthenticated) return;

      const r = await getProfile();
      if (!r.ok) {
        logout();
      }
    };

    validateSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBarComponent total={total} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={onAddToCart} />} />

          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
          />

          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
          />

          <Route
            path="/cart"
            element={
              isAuthenticated ? (
                <CartPage cart={cart} setCart={setCart} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/profile"
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
          />

          <Route path="/pizza/:id" element={<Pizza onAddToCart={onAddToCart} />} />
        </Routes>
      </main>

      <FooterComponent />
    </div>
  );
}

export default App;
