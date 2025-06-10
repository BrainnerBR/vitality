import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { toast } from "react-hot-toast"; // o el paquete de notificaciones que estés usando
import { realtimeDB } from "../../../services/firebaseConfig";


const HistorialEjercicios = () => {
    const [rutinas, setRutinas] = useState([]);

    const eliminarRutina = async (id) => {
  try {
    await remove(ref(realtimeDB, `rutinas/${id}`));
    toast("Rutina Eliminada Correctamente");
  } catch (error) {
    console.log("Error al eliminar Rutina:", error);
    toast.error("Error al eliminar Rutina");
  }
};

useEffect(() => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return;

  const db = getDatabase();
  const rutinasRef = ref(db, "rutinas");

  onValue(rutinasRef, (snapshot) => {
    const data = snapshot.val();
    const lista = [];

    for (let id in data) {
      if (data[id].uid === user.uid) {
        lista.push({ id, ...data[id] });
      }
    }

    const ordenadas = lista.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );

    setRutinas(ordenadas);
  });
}, []);
const formatoFecha = (rowData) =>
  format(new Date(rowData.fecha), "dd/MM/yyyy HH:mm");

const tipoTemplate = (rowData) => (
  <Tag
    value={rowData.tipo.toUpperCase()}
    severity={
      rowData.tipo === "fuerza"
        ? "danger"
        : rowData.tipo === "cardio"
        ? "success"
        : "info"
    }
  />
);

const detalleTemplate = (rowData) => {
  if (rowData.tipo === "fuerza") {
    return `${rowData.sets} sets x ${rowData.repeticiones} repeticiones (${rowData.peso} kg)`;
  } else if (rowData.tipo === "cardio") {
    return `${rowData.duracion} minutos`;
  } else {
    return "Ejercicio de flexibilidad";
  }
};




  return (
    <div>
      <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Historial de Rutinas
          </h2>
          <DataTable
            value={rutinas}
            paginator
            rows={5}
            stripedRows
            responsiveLayout="stack"
            breakpoint="960px"
            emptyMessage="No hay rutinas registradas."
            className="shadow-lg rounded-lg"
          >
            <Column field="ejercicio" header="Ejercicio" sortable></Column>
            <Column
              field="tipo"
              header="Tipo"
              body={tipoTemplate}
              sortable
            ></Column>
            <Column header="Detalle" body={detalleTemplate}></Column>
            <Column header="Fecha" body={formatoFecha} sortable></Column>
            <Column
              header="Acciones"
              body={(rowData) => (
                <button
                  onClick={() => eliminarRutina(rowData.id)}
                  className="flex justify-center items-center text-red-500 hover:text-white bg-transparent hover:bg-red-500 border border-red-500 px-1 py-1 rounded transition w-8 h-8"
                  title="Eliminar rutina"
                >
                  <i className="pi pi-trash text-sm" />
                </button>
              )}
            />
          </DataTable>
        </div>
    </div>
  );
}

export default HistorialEjercicios;
