import React, { useState, useEffect } from "react";

export default function App() {
  // Estado inicial cargado desde localStorage o con los datos por defecto del prototipo
  const [paises, setPaises] = useState(() => {
    const saved = localStorage.getItem("paises_abm");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, nombre: "Chile" },
          { id: 2, nombre: "Perú" },
          { id: 3, nombre: "Uruguay" },
        ];
  });

  const [modal, setModal] = useState(null); // null | 'alta' | 'modificar' | 'baja'
  const [selectedPais, setSelectedPais] = useState(null);
  const [nombreInput, setNombreInput] = useState("");

  // S sincronizar con localStorage cada vez que cambie 'paises'
  useEffect(() => {
    localStorage.setItem("paises_abm", JSON.stringify(paises));
  }, [paises]);

  // --- ACCIONES DE ABM ---
  const abrirAlta = () => {
    setNombreInput("");
    setModal("alta");
  };

  const abrirModificar = (pais) => {
    setSelectedPais(pais);
    setNombreInput(pais.nombre);
    setModal("modificar");
  };

  const abrirBaja = (pais) => {
    setSelectedPais(pais);
    setModal("baja");
  };

  const guardarAlta = (e) => {
    e.preventDefault();
    if (!nombreInput.trim()) return;
    const nuevoPais = { id: Date.now(), nombre: nombreInput.trim() };
    setPaises([...paises, nuevoPais]);
    setModal(null);
  };

  const guardarModificacion = (e) => {
    e.preventDefault();
    if (!nombreInput.trim()) return;
    const actualizados = paises.map((p) =>
      p.id === selectedPais.id ? { ...p, nombre: nombreInput.trim() } : p,
    );
    setPaises(actualizados);
    setModal(null);
  };

  const confirmarBaja = () => {
    const filtrados = paises.filter((p) => p.id !== selectedPais.id);
    setPaises(filtrados);
    setModal(null);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "30px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h2>Gestión de Países (ABM)</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>
        Trabajo Práctico - Ejercicio B
      </p>

      {/* Botón de Alta (Simulando el prototipo) */}
      <button
        onClick={abrirAlta}
        style={{
          marginBottom: "15px",
          padding: "8px 15px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        + Alta País
      </button>

      {/* Tabla Principal */}
      <table
        border="1"
        cellPadding="12"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f8f9fa" }}>
            <th style={{ width: "90px", textAlign: "center" }}>Modificar</th>
            <th style={{ width: "80px", textAlign: "center" }}>Baja</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {paises.map((pais) => (
            <tr key={pais.id}>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => abrirModificar(pais)}
                  style={{
                    background: "none",
                    border: "1px solid #ccc",
                    padding: "4px 8px",
                    cursor: "pointer",
                    borderRadius: "3px",
                  }}
                  title="Modificar país"
                >
                  ✏️ Modificar
                </button>
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => abrirBaja(pais)}
                  style={{
                    background: "none",
                    border: "1px solid #dc3545",
                    color: "#dc3545",
                    padding: "4px 8px",
                    cursor: "pointer",
                    borderRadius: "3px",
                  }}
                  title="Dar de baja país"
                >
                  🗑️ Baja
                </button>
              </td>
              <td style={{ fontWeight: "500" }}>{pais.nombre}</td>
            </tr>
          ))}
          {paises.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", color: "#886" }}>
                No hay países registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= MODAL: ALTA PAÍS ================= */}
      {modal === "alta" && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Alta País</h3>
            <form onSubmit={guardarAlta}>
              <div style={{ margin: "15px 0" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Nombre:
                </label>
                <input
                  type="text"
                  value={nombreInput}
                  onChange={(e) => setNombreInput(e.target.value)}
                  required
                  placeholder="Ej: Argentina"
                  style={styles.input}
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  style={styles.btnCancel}
                >
                  Cancelar
                </button>
                <button type="submit" style={styles.btnPrimary}>
                  Aceptar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: MODIFICAR PAÍS ================= */}
      {modal === "modificar" && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Modificar País</h3>
            <form onSubmit={guardarModificacion}>
              <div style={{ margin: "15px 0" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Nombre:
                </label>
                <input
                  type="text"
                  value={nombreInput}
                  onChange={(e) => setNombreInput(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  style={styles.btnCancel}
                >
                  Cancelar
                </button>
                <button type="submit" style={styles.btnPrimary}>
                  Aceptar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: BAJA DE PAÍS ================= */}
      {modal === "baja" && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Baja de País</h3>
            <p style={{ margin: "15px 0", color: "#333" }}>
              ¿Está seguro que desea dar de baja el país{" "}
              <strong>{selectedPais?.nombre}</strong>?
            </p>
            <div style={{ textAlign: "right" }}>
              <button
                type="button"
                onClick={() => setModal(null)}
                style={styles.btnCancel}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarBaja}
                style={styles.btnDanger}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos limpios para modales y componentes
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "6px",
    width: "400px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  btnCancel: {
    padding: "6px 12px",
    marginRight: "10px",
    background: "#e0e0e0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnPrimary: {
    padding: "6px 12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnDanger: {
    padding: "6px 12px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
