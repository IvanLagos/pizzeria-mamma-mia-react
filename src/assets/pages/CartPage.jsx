import { useMemo, useState } from "react";
import { Container, Button, ListGroup, Alert, Modal } from "react-bootstrap";
import { formatCLP } from "../utils/formatCLP";
import { useUser } from "../../contexts/UserContext";

const CartPage = ({ cart = [], setCart }) => {
  const { token } = useUser();

  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const total = useMemo(
    () => cart.reduce((acc, p) => acc + p.price * p.count, 0),
    [cart]
  );

  const isEmpty = cart.length === 0;

  const increase = (id) => {
    if (typeof setCart !== "function") return;
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, count: p.count + 1 } : p))
    );
  };

  const decrease = (id) => {
    if (typeof setCart !== "function") return;
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, count: p.count - 1 } : p))
        .filter((p) => p.count > 0)
    );
  };

  const handlePay = () => {
    if (!token || isEmpty) return;

    // ✅ Crear boleta simple
    const now = new Date();
    const items = cart.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      count: p.count,
      subtotal: p.price * p.count,
    }));

    const totalItems = items.reduce((acc, it) => acc + it.count, 0);

    setReceipt({
      date: now.toLocaleString("es-CL"),
      items,
      totalItems,
      total,
    });

    setShowReceipt(true);

    // ✅ Vaciar carrito después de comprar
    if (typeof setCart === "function") setCart([]);
  };

  return (
    <Container className="mt-5 mb-5" style={{ maxWidth: 800 }}>
      <h2 className="mb-4">Carrito</h2>

      {isEmpty ? (
        <Alert variant="secondary" className="text-center">
          🛒 Tu carrito está vacío. ¡Agrega una pizza!
        </Alert>
      ) : (
        <>
          <ListGroup className="mb-4">
            {cart.map((p) => (
              <ListGroup.Item
                key={p.id}
                className="d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />
                  <div>
                    <div className="fw-bold">{p.name}</div>
                    <div className="text-muted small">
                      {formatCLP(p.price)} c/u
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Button variant="outline-danger" onClick={() => decrease(p.id)}>
                    −
                  </Button>

                  <div className="fw-bold" style={{ minWidth: 28, textAlign: "center" }}>
                    {p.count}
                  </div>

                  <Button variant="outline-success" onClick={() => increase(p.id)}>
                    +
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="d-flex align-items-center justify-content-between">
            <h4 className="m-0">Total: {formatCLP(total)}</h4>

            <div className="text-end">
              {!token && (
                <div className="text-danger small mb-2">
                  Debes iniciar sesión para pagar
                </div>
              )}

              <Button variant="dark" disabled={!token || isEmpty} onClick={handlePay}>
                Pagar
              </Button>
            </div>
          </div>
        </>
      )}

      {/* ✅ Modal Boleta */}
      <Modal show={showReceipt} onHide={() => setShowReceipt(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🧾 Boleta</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!receipt ? (
            <div>Cargando boleta...</div>
          ) : (
            <>
              <div className="text-muted small mb-3">Fecha: {receipt.date}</div>

              <ListGroup className="mb-3">
                {receipt.items.map((it) => (
                  <ListGroup.Item
                    key={it.id}
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div>
                      <div className="fw-bold">{it.name}</div>
                      <div className="text-muted small">
                        {it.count} × {formatCLP(it.price)}
                      </div>
                    </div>
                    <div className="fw-bold">{formatCLP(it.subtotal)}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex justify-content-between">
                <div className="fw-semibold">Ítems:</div>
                <div>{receipt.totalItems}</div>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <div className="fw-bold">TOTAL:</div>
                <div className="fw-bold">{formatCLP(receipt.total)}</div>
              </div>

              <Alert variant="success" className="mt-3 text-center mb-0">
                ✅ ¡Compra realizada con éxito!
              </Alert>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReceipt(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartPage;
