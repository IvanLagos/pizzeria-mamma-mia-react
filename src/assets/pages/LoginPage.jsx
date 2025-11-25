import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VALID_EMAIL = "admin@pizzeria.cl";
const VALID_PASS  = "123456";

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("info");

  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje("Todos los campos son obligatorios");
      setTipo("danger");
      setIsLogged(false);
      setToken(false);
      return;
    }

    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres");
      setTipo("danger");
      setIsLogged(false);
      setToken(false);
      return;
    }

    if (email === VALID_EMAIL && password === VALID_PASS) {
      setMensaje("Usuario y contraseña correctos");
      setTipo("success");
      setIsLogged(true);
      setToken(true);
      navigate("/profile");
    } else {
      setMensaje("Usuario o contraseña incorrectos");
      setTipo("danger");
      setIsLogged(false);
      setToken(false);
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setToken(false); 
    setMensaje("Sesión cerrada");
    setTipo("info");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-3">Iniciar Sesión</h2>

      {mensaje && (
        <p className={`alert alert-${tipo} mb-3`} style={{ fontWeight: 600 }}>
          {mensaje}
        </p>
      )}

      {!isLogged ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@pizzeria.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      ) : (
        <div className="d-grid gap-2">
          <button className="btn btn-secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
