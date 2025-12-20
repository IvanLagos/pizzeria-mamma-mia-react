import { useEffect, useState } from "react";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    email,
    getProfile,
    logout,
    loadingUser,
    userError,
    clearUserError,
  } = useUser();

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (typeof clearUserError === "function") clearUserError();
    setMensaje("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      const r = await getProfile();
      if (!r.ok) {
        setMensaje(r.message || "No se pudo cargar el perfil.");
      }
    };

    loadProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: 520 }}>
      <h1 className="text-center mb-4">Perfil</h1>

      {(mensaje || userError) && (
        <Alert variant="danger" className="text-center">
          {mensaje || userError}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          {loadingUser ? (
            <div className="d-flex justify-content-center py-4">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <p className="mb-3">
                <strong>Email:</strong> {email || "—"}
              </p>

              <Button variant="danger" className="w-100" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
