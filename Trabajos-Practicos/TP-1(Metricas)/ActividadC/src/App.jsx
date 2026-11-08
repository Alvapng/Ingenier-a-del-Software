// Referencias a elementos del DOM
const form = document.getElementById("itemForm");
const itemIdInput = document.getElementById("itemId");
const nombreInput = document.getElementById("nombre");
const descripcionInput = document.getElementById("descripcion");
const tableBody = document.getElementById("itemTableBody");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");

// Clave única para guardar en localStorage
const STORAGE_KEY = "abm_registros";

// -------------------------------------------------------------
// OPERACIONES DE ALMACENAMIENTO (LocalStorage)
// -------------------------------------------------------------

// Leer datos guardados
function getItems() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Guardar lista completa
function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// -------------------------------------------------------------
// LOGICA DE INTERFAZ (CRUD)
// -------------------------------------------------------------

// LECTURA (Read): Carga y dibuja la tabla
function renderTable() {
  const items = getItems();
  tableBody.innerHTML = "";

  if (items.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="empty-message">No hay registros guardados.</td>
            </tr>
        `;
    return;
  }

  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHTML(item.nombre)}</td>
            <td>${escapeHTML(item.descripcion)}</td>
            <td class="actions">
                <button class="btn btn-edit" onclick="editItem(${index})">Editar</button>
                <button class="btn btn-delete" onclick="deleteItem(${index})">Eliminar</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

// ALTA (Create) y MODIFICACIÓN (Update)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const items = getItems();
  const id = itemIdInput.value;
  const nombre = nombreInput.value.trim();
  const descripcion = descripcionInput.value.trim();

  if (!nombre || !descripcion) return;

  const registro = { nombre, descripcion };

  if (id === "") {
    // Modo Alta: Agregar nuevo elemento
    items.push(registro);
  } else {
    // Modo Modificación: Actualizar en la posición correspondiente
    items[id] = registro;
  }

  saveItems(items);
  resetForm();
  renderTable();
});

// PREPARAR MODIFICACIÓN: Cargar datos en los inputs del formulario
function editItem(index) {
  const items = getItems();
  const item = items[index];

  if (!item) return;

  itemIdInput.value = index;
  nombreInput.value = item.nombre;
  descripcionInput.value = item.descripcion;

  // Cambiar estado visual del botón
  btnSubmit.textContent = "Actualizar";
  btnSubmit.style.backgroundColor = "var(--accent)";
  btnCancel.style.display = "block";

  nombreInput.focus();
}

// BAJA (Delete): Eliminar registro
function deleteItem(index) {
  if (confirm("¿Confirma que desea eliminar este registro?")) {
    const items = getItems();
    items.splice(index, 1);
    saveItems(items);

    // Si se estaba editando el mismo elemento que se eliminó, resetear form
    if (itemIdInput.value === String(index)) {
      resetForm();
    }

    renderTable();
  }
}

// Cancelar edición en curso
btnCancel.addEventListener("click", resetForm);

// Limpiar formulario y restablecer a modo Alta
function resetForm() {
  form.reset();
  itemIdInput.value = "";
  btnSubmit.textContent = "Guardar";
  btnSubmit.style.backgroundColor = "var(--success)";
  btnCancel.style.display = "none";
}

// Helper simple para evitar problemas con comillas e inyección HTML
function escapeHTML(str) {
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[tag] || tag,
  );
}

// Inicializar tabla al cargar la página
document.addEventListener("DOMContentLoaded", renderTable);
