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

  // ✅ PERFIL
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

      // 🔐 Token inválido → cerrar sesión
      if (res.status === 401 || res.status === 403) {
        setToken("");
        setEmail("");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setUserError("");
        return {
          ok: false,
          message: "Sesión expirada. Inicia sesión nuevamente.",
        };
      }

      if (!res.ok) {
        throw new Error(data?.message || "No se pudo obtener el perfil");
      }

      if (data?.email) setEmail(data.email);

      return { ok: true, data };
    } catch (err) {
      setUserError(err?.message || "Error obteniendo perfil");
      return {
        ok: false,
        message: err?.message || "Error obteniendo perfil",
      };
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = () => {
    setToken("");
    setEmail("");
    setUserError("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const clearUserError = () => setUserError("");

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        isAuthenticated,
        loadingUser,
        userError,
        getProfile,
        logout,
        clearUserError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
