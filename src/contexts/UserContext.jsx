import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

const UserContext = createContext();

const API_BASE = "https://pizzeria-api-zfys.onrender.com";

export const UserProvider = ({ children }) => {
  // ✅ JWT token string + email persistidos
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");

  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState("");

  const isAuthenticated = Boolean(token);

  // Persistencia
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (email) localStorage.setItem("email", email);
    else localStorage.removeItem("email");
  }, [email]);

  // Header auth
  const authHeader = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  // ✅ Limpiar error global (estable)
  const clearUserError = useCallback(() => setUserError(""), []);

  // ✅ Logout (limpia todo)
  const logout = useCallback(() => {
    setToken("");
    setEmail("");
    setUserError("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }, []);

  // ✅ Login -> POST /api/auth/login
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

      if (!res.ok) {
        const msg = data?.message || data?.error || `Login fallido (HTTP ${res.status})`;
        throw new Error(msg);
      }

      // ✅ token + email
      setToken(data?.token || "");
      setEmail(data?.email || email);

      return { ok: true, data };
    } catch (err) {
      const msg = err?.message || "Error en login";
      setUserError(msg);
      return { ok: false, message: msg };
    } finally {
      setLoadingUser(false);
    }
  };

  // ✅ Register -> POST /api/auth/register
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

      if (!res.ok) {
        const msg =
          data?.message || data?.error || `Registro fallido (HTTP ${res.status})`;
        throw new Error(msg);
      }

      setToken(data?.token || "");
      setEmail(data?.email || email);

      return { ok: true, data };
    } catch (err) {
      const msg = err?.message || "Error en registro";
      setUserError(msg);
      return { ok: false, message: msg };
    } finally {
      setLoadingUser(false);
    }
  };

  // ✅ Perfil -> GET /api/auth/me (auto-logout si token inválido)
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

      if (res.status === 401 || res.status === 403) {
        // ✅ Token inválido → limpiar sesión
        logout();
        return {
          ok: false,
          message: "Sesión expirada. Inicia sesión nuevamente.",
        };
      }

      if (!res.ok) {
        const msg = data?.message || `No se pudo obtener el perfil (HTTP ${res.status})`;
        throw new Error(msg);
      }

      if (data?.email) setEmail(data.email);

      return { ok: true, data };
    } catch (err) {
      const msg = err?.message || "Error obteniendo perfil";
      setUserError(msg);
      return { ok: false, message: msg };
    } finally {
      setLoadingUser(false);
    }
  };

  // ✅ Checkout -> POST /api/checkouts con Bearer token
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

      if (res.status === 401 || res.status === 403) {
        logout();
        return { ok: false, message: "Sesión expirada. Inicia sesión nuevamente." };
      }

      if (!res.ok) {
        const msg = data?.message || `Error al procesar compra (HTTP ${res.status})`;
        throw new Error(msg);
      }

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
