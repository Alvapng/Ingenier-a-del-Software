import React, { useState, useEffect } from "react";

export default function App() {
  // Estado para la lista de direcciones guardadas (recuperado de localStorage)
  const [direcciones, setDirecciones] = useState(() => {
    const saved = localStorage.getItem("direcciones_delivery");
    return saved ? JSON.parse(saved) : [];
  });

  // Estado para el formulario con todos los campos de la imagen
  const [formData, setFormData] = useState({
    coordenadas: "",
    calle: "",
    numero: "",
    piso: "",
    depto: "",
    ciudad: "",
    localidad: "",
    aclaraciones: "",
    alias: "",
  });

  // Guardar en localStorage cada vez que la lista de direcciones cambie
  useEffect(() => {
    localStorage.setItem("direcciones_delivery", JSON.stringify(direcciones));
  }, [direcciones]);

  // Manejar el cambio de input de cualquier campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guardar la dirección
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos obligatorios que tienen asterisco (*)
    if (
      !formData.coordenadas ||
      !formData.calle ||
      !formData.numero ||
      !formData.ciudad ||
      !formData.localidad ||
      !formData.alias
    ) {
      alert("Por favor, completa todos los campos obligatorios (*).");
      return;
    }

    const nuevaDireccion = {
      id: Date.now(),
      ...formData,
    };

    setDirecciones([...direcciones, nuevaDireccion]);
    limpiarFormulario();
    alert("¡Dirección guardada con éxito!");
  };

  // Resetear el formulario al pulsar Cancelar
  const limpiarFormulario = () => {
    setFormData({
      coordenadas: "",
      calle: "",
      numero: "",
      piso: "",
      depto: "",
      ciudad: "",
      localidad: "",
      aclaraciones: "",
      alias: "",
    });
  };

  return (
    <div style={styles.container}>
      {/* Modal / Card principal: Agregar dirección */}
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Agregar dirección</h2>
          <span
            style={styles.closeBtn}
            onClick={limpiarFormulario}
            title="Limpiar"
          >
            ✕
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Coordenadas * */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Coordenadas *</label>
            <input
              type="text"
              name="coordenadas"
              value={formData.coordenadas}
              onChange={handleChange}
              style={styles.input}
              placeholder="-32.8895, -68.8444"
              required
            />
          </div>

          {/* Calle * */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Calle *</label>
            <input
              type="text"
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Número *, Piso, Depto */}
          <div style={styles.row}>
            <div style={{ ...styles.formGroup, flex: 2 }}>
              <label style={styles.label}>Número *</label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Piso</label>
              <input
                type="text"
                name="piso"
                value={formData.piso}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Depto</label>
              <input
                type="text"
                name="depto"
                value={formData.depto}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          {/* Ciudad * y Localidad * */}
          <div style={styles.row}>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Ciudad *</label>
              <select
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Selecciona tu ciudad</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Tunuyán">Tunuyán</option>
                <option value="Godoy Cruz">Godoy Cruz</option>
              </select>
            </div>

            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Localidad *</label>
              <select
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Selecciona tu localidad</option>
                <option value="Centro">Centro</option>
                <option value="Norte">Norte</option>
                <option value="Sur">Sur</option>
              </select>
            </div>
          </div>

          {/* Aclaraciones */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Aclaraciones</label>
            <input
              type="text"
              name="aclaraciones"
              value={formData.aclaraciones}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: Tocar timbre 2B, portón negro"
            />
          </div>

          {/* Alias * */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Alias *</label>
            <input
              type="text"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: Casa, Trabajo, Dpto Novia"
              required
            />
          </div>

          {/* Botones */}
          <div style={styles.footer}>
            <button
              type="button"
              onClick={limpiarFormulario}
              style={styles.btnCancel}
            >
              Cancelar
            </button>
            <button type="submit" style={styles.btnSave}>
              Guardar
            </button>
          </div>
        </form>
      </div>

      {/* Lista de direcciones persistidas para verificar funcionamiento */}
      <div style={styles.savedSection}>
        <h3>Direcciones Guardadas (LocalStorage)</h3>
        {direcciones.length === 0 ? (
          <p style={{ color: "#777" }}>No hay direcciones guardadas aún.</p>
        ) : (
          <ul style={{ paddingLeft: "20px" }}>
            {direcciones.map((dir) => (
              <li key={dir.id} style={{ marginBottom: "10px" }}>
                <strong>{dir.alias}:</strong> {dir.calle} N° {dir.numero}
                {dir.piso && ` (Piso ${dir.piso}`}{" "}
                {dir.depto && `Dpto ${dir.depto})`}, {dir.ciudad} -{" "}
                {dir.localidad}.
                <br />
                <small style={{ color: "#555" }}>
                  Coordenadas: {dir.coordenadas}{" "}
                  {dir.aclaraciones && `| Note: ${dir.aclaraciones}`}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Estilos visuales respetando el prototipo
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    padding: "40px 20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "420px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    padding: "24px",
    border: "1px solid #e0e0e0",
  },
  header: {
    display: "flex",
    justifyContent: "space-[#666]",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
    color: "#333",
  },
  closeBtn: {
    cursor: "pointer",
    fontSize: "18px",
    color: "#888",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "16px",
  },
  row: {
    display: "flex",
    gap: "12px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#777",
    marginBottom: "4px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "8px 0",
    border: "none",
    borderBottom: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "13px",
    color: "#555",
    backgroundColor: "#fff",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  },
  btnCancel: {
    padding: "8px 18px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#666",
    cursor: "pointer",
    fontSize: "14px",
  },
  btnSave: {
    padding: "8px 22px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#6c757d",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  savedSection: {
    marginTop: "30px",
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
};
