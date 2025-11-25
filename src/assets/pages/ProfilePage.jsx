import { useNavigate } from "react-router-dom";

export default function ProfilePage({ setToken }) {
  const email = "usuario@pizzeria.cl";
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(false);
    alert("Sesion cerrada");
    navigate("/");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h2>Perfil</h2>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}
