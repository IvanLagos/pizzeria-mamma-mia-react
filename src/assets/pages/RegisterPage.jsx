import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, register, loadingUser, userError, clearUserError } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
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

    if (!emailTrim || !password || !password2) {
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
    if (password !== password2) {
      setTipo("danger");
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    const result = await register({ email: emailTrim, password });

    if (result.ok) {
      setTipo("success");
      setMensaje("✅ Registro exitoso. Sesión iniciada.");
      navigate("/");
    } else {
      setTipo("danger");
      setMensaje(result.message || "❌ No se pudo registrar.");
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: 520 }}>
      <h1 className="text-center mb-4">Registro</h1>

      {(mensaje || userError) && (
        <Alert variant={mensaje ? tipo : "danger"} className="text-center">
          {mensaje || userError}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="registerPassword2">
              <Form.Label>Repite contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="******"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                autoComplete="new-password"
              />
            </Form.Group>

            <Button type="submit" className="w-100" variant="primary" disabled={loadingUser}>
              {loadingUser ? "Registrando..." : "Crear cuenta"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterPage;
