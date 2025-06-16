import React, { useState, useEffect, useRef } from "react";

const tipos = ["Tabata", "For Time", "EMOM", "AMRAP"];

const TimerEntrenamientos = () => {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Tabata");
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);
  const [fase, setFase] = useState("Trabajo");
  const [ronda, setRonda] = useState(1);

  const intervalRef = useRef(null);

  const [tabataConfig, setTabataConfig] = useState({ rondas: 8, trabajo: 20, descanso: 10 });
  const [emomConfig, setEmomConfig] = useState({ cadaMinuto: 1, rondas: 5 });
  const [amrapConfig, setAmrapConfig] = useState({ minutos: 10 });

  const formatearTiempo = (seg) => {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

const iniciar = () => {
  setActivo(true);

  if (tipoSeleccionado === "Tabata") {
    setTiempo(tabataConfig.trabajo);
    setFase("Trabajo");
    setRonda(1);
  } else if (tipoSeleccionado === "For Time") {
    setTiempo(0); // ahora inicia desde cero
  } else if (tipoSeleccionado === "EMOM") {
    setTiempo(emomConfig.cadaMinuto * 60);
    setRonda(1);
  } else if (tipoSeleccionado === "AMRAP") {
    setTiempo(amrapConfig.minutos * 60);
  }
};


  const pausar = () => {
    setActivo(false);
  };

  const reiniciar = () => {
    setActivo(false);
    setTiempo(0);
    setFase("Trabajo");
    setRonda(1);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (activo) {
      intervalRef.current = setInterval(() => {
        setTiempo((prev) => {
  if (tipoSeleccionado === "For Time") {
    return prev + 1; // solo suma
  }

  if (prev <= 1) {
    if (tipoSeleccionado === "Tabata") {
      if (fase === "Trabajo") {
        setFase("Descanso");
        return tabataConfig.descanso;
      } else {
        if (ronda >= tabataConfig.rondas) {
          reiniciar();
          return 0;
        } else {
          setFase("Trabajo");
          setRonda((r) => r + 1);
          return tabataConfig.trabajo;
        }
      }
    } else if (tipoSeleccionado === "AMRAP") {
      reiniciar();
      return 0;
    } else if (tipoSeleccionado === "EMOM") {
      if (ronda >= emomConfig.rondas) {
        reiniciar();
        return 0;
      } else {
        setRonda((r) => r + 1);
        return emomConfig.cadaMinuto * 60;
      }
    }
    return 0;
  }

  return prev - 1;
});

      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [activo, fase, tipoSeleccionado, ronda]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold text-center text-red-500 mb-4">Temporizadores de Entrenamiento</h2>

      <div className="flex justify-center gap-2 mb-4">
        {tipos.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTipoSeleccionado(t);
              reiniciar();
            }}
            className={`px-3 py-1 rounded ${
              tipoSeleccionado === t ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Inputs por tipo */}
      <div className="mb-4 text-sm text-gray-700 space-y-2">
        {tipoSeleccionado === "Tabata" && (
          <div className="grid grid-cols-3 gap-2">
            <div>
              <input type="number" min="1" value={tabataConfig.rondas} onChange={e => setTabataConfig({ ...tabataConfig, rondas: parseInt(e.target.value) })} className="border p-1 rounded w-full" />
              <div className="text-xs text-center mt-1">Rondas</div>
            </div>
            <div>
              <input type="number" min="1" value={tabataConfig.trabajo} onChange={e => setTabataConfig({ ...tabataConfig, trabajo: parseInt(e.target.value) })} className="border p-1 rounded w-full" />
              <div className="text-xs text-center mt-1">Trabajo (s)</div>
            </div>
            <div>
              <input type="number" min="1" value={tabataConfig.descanso} onChange={e => setTabataConfig({ ...tabataConfig, descanso: parseInt(e.target.value) })} className="border p-1 rounded w-full" />
              <div className="text-xs text-center mt-1">Descanso (s)</div>
            </div>
          </div>
        )}

          {tipoSeleccionado === "For Time" && (
            <div>
              <div className="text-xs text-center mt-1">Minutos totales</div>
            </div>
          )}


        {tipoSeleccionado === "EMOM" && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input type="number" min="1" value={emomConfig.cadaMinuto} onChange={e => setEmomConfig({ ...emomConfig, cadaMinuto: parseInt(e.target.value) })} className="border p-1 rounded w-full" />
              <div className="text-xs text-center mt-1">Cada (min)</div>
            </div>
            <div>
              <input type="number" min="1" value={emomConfig.rondas} onChange={e => setEmomConfig({ ...emomConfig, rondas: parseInt(e.target.value) })} className="border p-1 rounded w-full" />
              <div className="text-xs text-center mt-1">Rondas</div>
            </div>
          </div>
        )}

        {tipoSeleccionado === "AMRAP" && (
          <div>
            <input type="number" min="1" value={amrapConfig.minutos} onChange={e => setAmrapConfig({ minutos: parseInt(e.target.value) })} className="border p-1 rounded w-full" />
            <div className="text-xs text-center mt-1">Minutos totales</div>
          </div>
        )}
      </div>

      {/* Temporizador */}
      <div className="text-center text-4xl font-mono text-gray-800 mb-4">
        {formatearTiempo(tiempo)}
      </div>

      {/* Info extra */}
      {tipoSeleccionado === "Tabata" && activo && (
        <div className="text-center text-sm mb-2 text-gray-600">
          {fase} - Ronda {ronda} / {tabataConfig.rondas}
        </div>
      )}
      {tipoSeleccionado === "EMOM" && activo && (
        <div className="text-center text-sm mb-2 text-gray-600">
          Ronda {ronda} / {emomConfig.rondas}
        </div>
      )}

      {/* Controles */}
      <div className="flex justify-center gap-4">
        {!activo ? (
          <button onClick={iniciar} className="bg-green-500 text-white px-4 py-2 rounded">
            Iniciar
          </button>
        ) : (
          <button onClick={pausar} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Pausar
          </button>
        )}
        <button onClick={reiniciar} className="bg-red-500 text-white px-4 py-2 rounded">
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default TimerEntrenamientos;
