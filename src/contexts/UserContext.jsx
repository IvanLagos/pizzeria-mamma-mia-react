import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext();

const API_BASE = "https://pizzeria-api-zfys.onrender.com";

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState("");

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (email) localStorage.setItem("email", email);
    else localStorage.removeItem("email");
  }, [email]);

  const authHeader = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const clearUserError = () => setUserError("");

  const login = async ({ email, password }) => {
    setLoadingUser(true);
    setUserError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Login fallido");

      setToken(data?.token || "");
      setEmail(data?.email || email);

      return { ok: true };
    } catch (err) {
      setUserError(err?.message || "Error en login");
      return { ok: false, message: err?.message || "Error en login" };
    } finally {
      setLoadingUser(false);
    }
  };

  const register = async ({ email, password }) => {
    setLoadingUser(true);
    setUserError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Registro fallido");

      setToken(data?.token || "");
      setEmail(data?.email || email);

      return { ok: true };
    } catch (err) {
      setUserError(err?.message || "Error en registro");
      return { ok: false, message: err?.message || "Error en registro" };
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = () => {
    setToken("");
    setEmail("");
    setUserError("");
  };

  const getProfile = async () => {
    if (!token) return { ok: false, message: "Sin sesión" };

    setLoadingUser(true);
    setUserError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        method: "GET",
        headers: { ...authHeader },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo obtener el perfil");

      if (data?.email) setEmail(data.email);

      return { ok: true, data };
    } catch (err) {
      setUserError(err?.message || "Error obteniendo perfil");
      return { ok: false, message: err?.message || "Error obteniendo perfil" };
    } finally {
      setLoadingUser(false);
    }
  };

  const checkout = async (cart) => {
    if (!token) return { ok: false, message: "Debes iniciar sesión" };

    try {
      const res = await fetch(`${API_BASE}/api/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Error al procesar compra");

      return { ok: true, data };
    } catch (err) {
      return { ok: false, message: err?.message || "Error al procesar compra" };
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        isAuthenticated,
        loadingUser,
        userError,
        clearUserError,
        login,
        register,
        logout,
        getProfile,
        checkout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
