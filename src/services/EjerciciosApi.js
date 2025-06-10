const API_HEADERS = {
  'X-RapidAPI-Key': '07d26ce14fmsh5e9dc9e98bcbfc2p1c89b6jsnb323633c45a8',
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
};

export const obtenerEjercicios = async () => {
  try {
    const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
      method: 'GET',
      headers: API_HEADERS,
    });

    if (!response.ok) {
      throw new Error('No se pudieron obtener los ejercicios');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener ejercicios:', error);
    return [];
  }
};
export const clasificarTipo = (ejercicioNombre) => {
  if (!ejercicioNombre || typeof ejercicioNombre !== "string") return "";

  const nombre = ejercicioNombre.toLowerCase();

  if (
    nombre.includes("run") ||
    nombre.includes("treadmill") ||
    nombre.includes("bike") ||
    nombre.includes("jump rope") ||
    nombre.includes("cardio")
  ) {
    return "cardio";
  }

  if (
    nombre.includes("squat") ||
    nombre.includes("press") ||
    nombre.includes("curl") ||
    nombre.includes("deadlift") ||
    nombre.includes("bench") ||
    nombre.includes("row")
  ) {
    return "fuerza";
  }

  if (
    nombre.includes("stretch") ||
    nombre.includes("flex") ||
    nombre.includes("yoga")
  ) {
    return "flexibilidad";
  }

  return "";
};


