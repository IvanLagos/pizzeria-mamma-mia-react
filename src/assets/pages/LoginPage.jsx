import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";

const VALID_EMAIL = "admin@pizzeria.cl";
const VALID_PASS = "123456";

const LoginPage = () => {
  const navigate = useNavigate();
  const { token, login } = useUser();

  const [email, setEmail] = useState(VALID_EMAIL);
  const [password, setPassword] = useState(VALID_PASS);

  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("info"); // "success" | "danger" | "info"
  const [loading, setLoading] = useState(false);

  // ✅ Si ya hay sesión, no debería poder ver login
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailTrim = email.trim();

    // Validaciones
    if (!emailTrim || !password) {
      setTipo("danger");
      setMensaje("Completa todos los campos.");
      return;
    }

    if (!isValidEmail(emailTrim)) {
      setTipo("danger");
      setMensaje("Ingresa un correo válido.");
      return;
    }

    if (password.length < 6) {
      setTipo("danger");
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    // Simulación de “login”
    setTimeout(() => {
      if (emailTrim === VALID_EMAIL && password === VALID_PASS) {
        setTipo("success");
        setMensaje("✅ Usuario correcto. Sesión iniciada.");

        // ✅ Activa token global + localStorage
        login();

        // ✅ navega al home
        navigate("/");
      } else {
        setTipo("danger");
        setMensaje("❌ Credenciales incorrectas.");
      }

      setLoading(false);
    }, 350);
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: 520 }}>
      <h1 className="text-center mb-4">Iniciar Sesión</h1>

      {mensaje && (
        <Alert variant={tipo} className="text-center">
          {mensaje}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="admin@pizzeria.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              variant="primary"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
