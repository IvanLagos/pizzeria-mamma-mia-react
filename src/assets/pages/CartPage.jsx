import { formatCLP } from "../utils/formatCLP";

export default function Cart({ items, onInc, onDec, total, onPay }) {
  return (
    <div className="container mt-4" style={{ maxWidth: 720 }}>
      <h5 className="mb-3">Detalles del pedido:</h5>

      {items.length === 0 && (
        <div className="alert alert-info">Tu carrito está vacío.</div>
      )}

      {items.map((p) => (
        <div
          key={p.id}
          className="d-flex align-items-center justify-content-between border-bottom py-3"
        >
          <div className="d-flex align-items-center gap-3">
            <img
              src={p.img}
              alt={p.name}
              style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 8 }}
            />
            <div className="d-flex flex-column">
              <span className="fw-semibold text-capitalize">{p.name}</span>
              <small className="text-muted">{formatCLP(p.price)}</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => onDec(p.id)}
              aria-label="Disminuir"
            >–</button>

            <input
              value={p.count}
              readOnly
              className="form-control form-control-sm text-center"
              style={{ width: 48 }}
            />

            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => onInc(p.id)}
              aria-label="Aumentar"
            >+</button>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <h5 className="fw-bold">Total: {formatCLP(total)}</h5>
        <button className="btn btn-dark mt-2 mb-5 px-4" onClick={onPay} disabled={items.length === 0}>
          Pagar
        </button>
      </div>
    </div>
  );
}
