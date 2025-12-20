import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, loadingUser, userError, clearUserError } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("info");

  useEffect(() => {
    clearUserError();
    setMensaje("");

  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearUserError();
    setMensaje("");

    const emailTrim = email.trim();

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

    const result = await login({ email: emailTrim, password });

    if (result.ok) {
      setTipo("success");
      setMensaje("✅ Sesión iniciada correctamente.");
      navigate("/");
    } else {
      setTipo("danger");
      setMensaje(result.message || "❌ No se pudo iniciar sesión.");
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: 520 }}>
      <h1 className="text-center mb-4">Iniciar Sesión</h1>

      {(mensaje || userError) && (
        <Alert variant={mensaje ? tipo : "danger"} className="text-center">
          {mensaje || userError}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Form.Group>

            <Button type="submit" className="w-100" variant="primary" disabled={loadingUser}>
              {loadingUser ? "Ingresando..." : "Iniciar Sesión"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
