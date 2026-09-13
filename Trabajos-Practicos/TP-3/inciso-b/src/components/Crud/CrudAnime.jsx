import React, { useState } from "react";

const dataInicial = [
  { id: 1, personaje: "Naruto Uzumaki", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Luffy", anime: "One Piece" },
  { id: 4, personaje: "Kenshin Himura", anime: "Samurai X" },
];

export const CrudAnime = ({ onLogout }) => {
  const [data, setData] = useState(dataInicial);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const [form, setForm] = useState({
    id: "",
    personaje: "",
    anime: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModalInsertar = () => setModalInsertar(!modalInsertar);
  const toggleModalEditar = () => setModalEditar(!modalEditar);

  const insertar = () => {
    const nuevoRegistro = {
      ...form,
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
    };
    setData([...data, nuevoRegistro]);
    toggleModalInsertar();
    setForm({ id: "", personaje: "", anime: "" });
  };

  const seleccionarPersonaje = (elemento) => {
    setForm(elemento);
    setModalEditar(true);
  };

  const editar = () => {
    const nuevaData = data.map((item) => (item.id === form.id ? form : item));
    setData(nuevaData);
    toggleModalEditar();
  };

  const eliminar = (elemento) => {
    const opcion = window.confirm(
      "¿Estás seguro de eliminar el registro " + elemento.id + "?",
    );
    if (opcion) {
      setData(data.filter((item) => item.id !== elemento.id));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div
        className="card border-0 shadow-lg p-4"
        style={{
          width: "90%",
          maxWidth: "900px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold m-0" style={{ color: "#3c009d" }}>
              CRUD Personajes Anime
            </h2>
            <div
              style={{
                width: "60px",
                height: "5px",
                backgroundColor: "#3c009d",
                borderRadius: "9px",
                marginTop: "4px",
              }}
            ></div>
          </div>
          <button
            className="btn text-white px-4 fw-bold"
            style={{
              backgroundColor: "#eaeaea",
              color: "#676767",
              borderRadius: "50px",
              border: "none",
            }}
            onClick={onLogout}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#797979";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#eaeaea";
              e.target.style.color = "#676767";
            }}
          >
            Cerrar Sesión
          </button>
        </div>

        <button
          className="btn text-white fw-bold mb-4 py-2"
          style={{
            backgroundColor: "#4c00b4",
            borderRadius: "50px",
            border: "none",
          }}
          onClick={toggleModalInsertar}
        >
          + Crear Nuevo Personaje
        </button>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead style={{ borderBottom: "2px solid #4c00b4" }}>
              <tr>
                <th style={{ color: "#3c009d" }}>ID</th>
                <th style={{ color: "#3c009d" }}>Personaje</th>
                <th style={{ color: "#3c009d" }}>Anime</th>
                <th className="text-center" style={{ color: "#3c009d" }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((elemento) => (
                <tr key={elemento.id}>
                  <td className="fw-bold">{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.anime}</td>
                  <td className="text-center">
                    <button
                      className="btn text-white me-2 px-3 btn-sm fw-bold"
                      style={{
                        backgroundColor: "#4c00b4",
                        borderRadius: "20px",
                      }}
                      onClick={() => seleccionarPersonaje(elemento)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm text-secondary fw-bold px-3"
                      style={{
                        backgroundColor: "#eaeaea",
                        borderRadius: "20px",
                      }}
                      onClick={() => eliminar(elemento)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Insertar */}
        {modalInsertar && (
          <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content border-0 p-3"
                style={{ borderRadius: "20px" }}
              >
                <div className="modal-header border-0">
                  <h5
                    className="modal-title fw-bold"
                    style={{ color: "#3c009d" }}
                  >
                    Insertar Personaje
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleModalInsertar}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label text-secondary small">
                      ID
                    </label>
                    <input
                      className="form-control"
                      style={{
                        backgroundColor: "#eaeaea",
                        borderRadius: "10px",
                      }}
                      readOnly
                      type="text"
                      value={data.length > 0 ? data[data.length - 1].id + 1 : 1}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary small">
                      Personaje
                    </label>
                    <input
                      className="form-control"
                      style={{
                        backgroundColor: "#eaeaea",
                        borderRadius: "10px",
                      }}
                      name="personaje"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary small">
                      Anime
                    </label>
                    <input
                      className="form-control"
                      style={{
                        backgroundColor: "#eaeaea",
                        borderRadius: "10px",
                      }}
                      name="anime"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button
                    className="btn text-white fw-bold px-4"
                    style={{ backgroundColor: "#4c00b4", borderRadius: "50px" }}
                    onClick={insertar}
                  >
                    Insertar
                  </button>
                  <button
                    className="btn btn-secondary fw-bold px-4"
                    style={{ borderRadius: "50px" }}
                    onClick={toggleModalInsertar}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Editar */}
        {modalEditar && (
          <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content border-0 p-3"
                style={{ borderRadius: "20px" }}
              >
                <div className="modal-header border-0">
                  <h5
                    className="modal-title fw-bold"
                    style={{ color: "#3c009d" }}
                  >
                    Editar Personaje
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleModalEditar}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label text-secondary small">
                      ID
                    </label>
                    <input
                      className="form-control"
                      style={{
                        backgroundColor: "#eaeaea",
                        borderRadius: "10px",
                      }}
                      readOnly
                      type="text"
                      value={form.id}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary small">
                      Personaje
                    </label>
                    <input
                      className="form-control"
                      style={{
                        backgroundColor: "#eaeaea",
                        borderRadius: "10px",
                      }}
                      name="personaje"
                      type="text"
                      value={form.personaje}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary small">
                      Anime
                    </label>
                    <input
                      className="form-control"
                      style={{
                        backgroundColor: "#eaeaea",
                        borderRadius: "10px",
                      }}
                      name="anime"
                      type="text"
                      value={form.anime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button
                    className="btn text-white fw-bold px-4"
                    style={{ backgroundColor: "#4c00b4", borderRadius: "50px" }}
                    onClick={editar}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-secondary fw-bold px-4"
                    style={{ borderRadius: "50px" }}
                    onClick={toggleModalEditar}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
